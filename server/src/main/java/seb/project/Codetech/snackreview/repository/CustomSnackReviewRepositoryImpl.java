package seb.project.Codetech.snackreview.repository;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;

@Repository
@Transactional(readOnly = true)
public class CustomSnackReviewRepositoryImpl implements CustomSnackReviewRepository {
	@Override
	public List<SnackReviewResponseDto.Card> findCardsByProductIdAndSorted(SnackReviewServiceDto.Search cond) {
		return null;
	}
}
