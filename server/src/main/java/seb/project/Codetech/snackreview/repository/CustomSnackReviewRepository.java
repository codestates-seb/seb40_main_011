package seb.project.Codetech.snackreview.repository;

import java.util.List;

import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;

public interface CustomSnackReviewRepository {
	List<SnackReviewResponseDto.Card> findCardsByProductIdAndSorted(SnackReviewServiceDto.Search cond);
}
