package seb.project.Codetech.review.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.entity.ReviewComment;
import seb.project.Codetech.review.repository.ReviewCommRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;

@Service
@Transactional(readOnly = true)
public class ReviewCommService {
	private final ReviewCommRepository reviewCommRepository;
	private final ReviewService reviewService;
	private final UserService userService;
	private final UserRepository userRepository;

	public ReviewCommService(ReviewCommRepository reviewCommRepository, ReviewService reviewService,
		UserService userService, UserRepository userRepository) {
		this.reviewCommRepository = reviewCommRepository;
		this.reviewService = reviewService;
		this.userService = userService;
		this.userRepository = userRepository;

	}

	@Transactional
	public ReviewComment createReviewComm(String email, Long reviewId, ReviewComment reviewComment) {
		Review review = reviewService.findVerificationReview(reviewId);
		User user = userService.findUser(email);
		reviewComment.setReview(review);
		reviewComment.setUser(user);
		reviewComment.setWriter(user.getNickname());
		user.updatePoint(5);
		userRepository.save(user);


		return reviewCommRepository.save(reviewComment);
	}

	@Transactional
	public ReviewComment modifyReviewComm(String email, Long id, ReviewComment reviewComment) {
		ReviewComment reviewComm = findVerificationReviewComm(id);
		User user = userService.findUser(email);

		if (!reviewComm.getUser().getId().equals(user.getId())) {
			throw new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_MODIFY);
		}

		Optional.ofNullable(reviewComment.getContent()).ifPresent(reviewComm::setContent);

		return reviewCommRepository.save(reviewComm);
	}

	@Transactional
	public void replayCommentCheck(Long parentId, ReviewComment reviewComment) {
		if (parentId > 0) { // 부모댓글이 1이상이면 대댓글로 부모 정보를 삽입한다.
			ReviewComment parentComm = findVerificationReviewComm(parentId);
			ReviewComment childComm = findVerificationReviewComm(reviewComment.getId());
			childComm.setParent(parentComm);
			reviewCommRepository.save(childComm);
		}
	}

	public ReviewComment findVerificationReviewComm(Long reviewCommId) {
		Optional<ReviewComment> reviewComment = reviewCommRepository.findById(reviewCommId);
		return reviewComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_COMM_NOT_FOUND));
	}
}
