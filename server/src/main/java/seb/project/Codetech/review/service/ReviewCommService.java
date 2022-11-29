package seb.project.Codetech.review.service;

import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.entity.ReviewComment;
import seb.project.Codetech.review.repository.ReviewCommRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.service.UserService;

@Service
@Transactional(readOnly = true)
public class ReviewCommService {
	private final ReviewCommRepository reviewCommRepository;
	private final ReviewService reviewService;
	private final UserService userService;
	private final JPAQueryFactory queryFactory;

	public ReviewCommService(ReviewCommRepository reviewCommRepository, ReviewService reviewService,
		UserService userService, EntityManager em) {
		this.reviewCommRepository = reviewCommRepository;
		this.reviewService = reviewService;
		this.userService = userService;
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Transactional
	public Long createReviewComm(String email, Long reviewId, Long parentId, ReviewComment reviewComment) {
		Review review = reviewService.findVerificationReview(reviewId);
		User user = userService.findUser(email);
		reviewComment.setReview(review);
		reviewComment.setUser(user);
		reviewComment.setWriter(user.getNickname());
		reviewComment.setStatus(true); // 댓글은 생성시에 기본적으로 활성화 상태이다.
		user.updatePoint(5);

		if (parentId > 0) { // 댓글이 부모 댓글의 값이 있고 활성화 상태면 대댓글으로 등록된다.
			ReviewComment parentComm = findVerificationReviewComm(parentId);

			if (!parentComm.isStatus() || parentComm.getParent() != null) { // 부모 댓글인지 검증해서 아니면 예외
				throw new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_FOUND);
			}
			reviewComment.setParent(parentComm); // 맞으면 부모댓글 아이디를 삽입한다.
		}

		var saved = reviewCommRepository.save(reviewComment).getReview();
		saved.updateCommentCount(queryFactory);
		return saved.getId();
	}

	@Transactional
	public Long modifyReviewComm(String email, ReviewComment reviewComment) {
		ReviewComment reviewComm = findVerificationReviewComm(reviewComment.getId());
		User user = userService.findUser(email);

		if (!reviewComm.getUser().getId().equals(user.getId())) {
			throw new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_MODIFY);
		}

		if (!reviewComm.isStatus()) { // 댓글이 비활성화 상태일때 수정할 수 없다.
			throw new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_FOUND);
		}

		Optional.ofNullable(reviewComment.getContent()).ifPresent(reviewComm::setContent);

		return reviewCommRepository.save(reviewComm).getReview().getId();
	}

	@Transactional
	public void disableReviewComm(String email, Long id) {
		User user = userService.findUser(email);
		ReviewComment reviewComm = findVerificationReviewComm(id);

		if (!reviewComm.getUser().getId().equals(user.getId())) {
			throw new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_DELETE);
		}

		reviewComm.setStatus(false);
		reviewComm.setContent("작성자가 삭제한 댓글입니다.");

		reviewCommRepository.save(reviewComm);
	}

	public ReviewComment findVerificationReviewComm(Long reviewCommId) {
		Optional<ReviewComment> reviewComment = reviewCommRepository.findById(reviewCommId);
		return reviewComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_FOUND));
	}
}
