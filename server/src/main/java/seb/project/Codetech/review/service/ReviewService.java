package seb.project.Codetech.review.service;

import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.repository.ReviewRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.service.UserService;

@Service
@Transactional(readOnly = true)
@Log4j2
public class ReviewService {

	private final UserService userService;
	private final ReviewRepository reviewRepository;

	public ReviewService(UserService userService, ReviewRepository reviewRepository) {
		this.userService = userService;
		this.reviewRepository = reviewRepository;
	}

	@Transactional
	public Review createReview(String email, Review review) {
		User user = userService.findUser(email);
		review.setUser(user); // 작성자 아이디를 기록한다.
		review.setWriter(user.getNickname()); // 작성자 닉네임을 기록한다.
		review.setView(0L); // 조회수 기록을 위해 값을 생성한다.

		return reviewRepository.save(review);
	}

	@Transactional
	public Review modifyReview(String email, Review review) {
		User findUser = userService.findUser(email);
		System.out.println(findUser.getNickname());
		Review findReview = findVerificationReview(review.getId());
		System.out.println(findReview.getTitle());

		if (!Objects.equals(findReview.getUser().getId(), findUser.getId())) {
			throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_MODIFY); // 작성자가 아니라면 상세리뷰를 수정할 수 없다.
		}

		Optional.ofNullable(review.getTitle()).ifPresent(findReview::setTitle);
		Optional.ofNullable(review.getContent()).ifPresent(findReview::setContent);
		Optional.ofNullable(review.getType()).ifPresent(findReview::setType);
		Optional.ofNullable(review.getWriter()).ifPresent(findReview::setWriter);
		Optional.ofNullable(review.getView()).ifPresent(findReview::setView);
		Optional.ofNullable(review.getFileEntities()).ifPresent(findReview::setFileEntities);

		return reviewRepository.save(review);
	}

	public Review findVerificationReview(Long id) {
		Optional<Review> findReview = reviewRepository.findById(id);
		return findReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
	}
}
