package seb.project.Codetech.snackreview.repository;

import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;

public interface CustomSnackReviewRepository {
	SnackReviewResponseDto.Slice searchSortedSliceByProductId(SnackReviewServiceDto.Search cond);

	SnackReviewResponseDto.First searchFirstSliceByProductId(SnackReviewServiceDto.Search cond);
}
