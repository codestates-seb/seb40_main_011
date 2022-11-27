package seb.project.Codetech.review.repository;

import java.util.List;

import seb.project.Codetech.review.dto.ReviewResponseDto;

public interface CustomReviewRepository {
	long getReviewCountByProductId(Long productId);
	List<ReviewResponseDto.Best> getBestReviewContent(Integer size);
}
