package seb.project.Codetech.review.repository;

import java.util.List;

import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.entity.Sort;

public interface CustomReviewRepository {
	long getReviewCountByProductId(Long productId);

	List<ReviewResponseDto.Best> getBestReviewContent(Integer size);

	ReviewResponseDto.Page getReviewPageByReview(Long id, Review review);

	List<ReviewResponseDto.ReviewList> loadSortReviewByProductId(Long id, Sort sort, Long offset, Integer limit);

	List<ReviewResponseDto.Search> searchReviewByKeyword(String keyword, Long offset, Integer limit);

	boolean hasNext(List<?> responseList, Integer limit);
}
