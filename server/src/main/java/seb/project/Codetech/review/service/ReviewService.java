package seb.project.Codetech.review.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.service.ProductService;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.repository.ReviewRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;

@Service
@Transactional(readOnly = true)
@Log4j2
public class ReviewService {

	private final UserService userService;
	private final ProductService productService;
	private final ReviewRepository reviewRepository;
	private final UserRepository userRepository;

	public ReviewService(UserService userService, ProductService productService, ReviewRepository reviewRepository,
						 UserRepository userRepository) {
		this.userService = userService;
		this.productService = productService;
		this.reviewRepository = reviewRepository;
		this.userRepository = userRepository;
	}

	@Transactional
	public Review createReview(String email, Long productId, Review review) {
		User user = userService.findUser(email);
		Product product = productService.findProduct(productId);
		review.setUser(user); // 작성자 정보를 삽입한다.
		review.setProduct(product); // 등록된 리뷰의 제품 정보를 삽입한다.
		review.setType(product.getType()); // 제품 정보에서 타입 유형을 가져와서 삽입한다.
		review.setWriter(user.getNickname()); // 작성자 닉네임을 삽입한다.
		review.setView(0L); // 조회수 컬럼으로 0값으로 시작한다.
		review.setRecommendNumber(0L);
		user.updatePoint(100);
		userRepository.save(user);

		return reviewRepository.save(review);
	}

	@Transactional
	public Review modifyReview(String email, Long id, Long productId, Review review) {
		Review findReview = findVerificationReview(id);
		User findUser = userService.findUser(email);
		Product product = productService.findProduct(productId);

		if (!review.getUser().getId().equals(findUser.getId())) {
			throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_MODIFY); // 작성자가 아니라면 상세리뷰를 수정할 수 없다.
		}

		Optional.ofNullable(review.getTitle()).ifPresent(findReview::setTitle); // 넘겨받은 값이 있으면 그 값으로 아니면 기존값으로 다시 저장한다.
		Optional.ofNullable(review.getContent()).ifPresent(findReview::setContent);
		Optional.ofNullable(product).ifPresent(findReview::setProduct); // 회원이 제품을 변경하면 변경되도록 설정
		Optional.ofNullable(review.getFileEntities()).ifPresent(findReview::setFileEntities);
		findUser.updatePoint(10);
		userRepository.save(findUser);

		return reviewRepository.save(findReview);
	}

	@Transactional
	public void removeReview(String email, Long id) {
		User user = userService.findUser(email);
		Review review = findVerificationReview(id);

		if (!review.getUser().getId().equals(user.getId())) {
			throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_MODIFY);
		}

		reviewRepository.deleteById(id);
	}

	public Review findVerificationReview(Long id) {
		Optional<Review> findReview = reviewRepository.findById(id);
		return findReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
	}
}
