package seb.project.Codetech.snackreview.repository;

import java.util.List;

import seb.project.Codetech.productstat.entity.ProductStat;
import seb.project.Codetech.snackreview.dto.SnackReviewRequestDto;
import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;

public interface CustomSnackReviewRepository {
	List<SnackReviewResponseDto.Card> searchSortedCardsByProductId(SnackReviewRequestDto.Get cond);

	ProductStat searchInfoGroupByProductId(Long productId);

	boolean hasNext(List<SnackReviewResponseDto.Card> cards, int limit);
}
