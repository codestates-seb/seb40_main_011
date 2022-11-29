package seb.project.Codetech.review.repository;

import java.util.List;

import seb.project.Codetech.review.dto.ReviewRequestDto;
import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;

public interface CustomReviewRepository {
	long getReviewCountByProductId(Long productId);

	List<ReviewResponseDto.Best> getBestReviewContent(Integer size);

	ReviewResponseDto.Page getReviewPageByReview(Long id, Review review);

	List<ReviewResponseDto.ReviewList> loadSortReviewByProductId(ReviewRequestDto.Get get);
}
