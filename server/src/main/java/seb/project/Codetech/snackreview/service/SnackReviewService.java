package seb.project.Codetech.snackreview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.snackreview.dto.SnackReviewControllerDto;
import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.snackreview.mapper.SnackReviewServiceMapper;
import seb.project.Codetech.snackreview.repository.SnackReviewRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class SnackReviewService {
	private final SnackReviewRepository snackReviewRepository;
	private final SnackReviewServiceMapper dtoMapper;

	@Transactional(readOnly = true)
	public SnackReviewResponseDto.Info readStats(Long productId) {
		return snackReviewRepository.searchInfoGroupByProductId(productId);
	}

	@Transactional(readOnly = true)
	public SnackReviewResponseDto.Slice readSlice(SnackReviewControllerDto.Get params) {
		SnackReviewServiceDto.Search cond = dtoMapper.getParamsToSearchCond(params);

		List<SnackReviewResponseDto.Card> cards = snackReviewRepository.searchSortedCardsByProductId(cond);

		SnackReviewResponseDto.Slice slice = new SnackReviewResponseDto.Slice();
		slice.setHasNext(hasNext(cards, cond.getLimit()));
		slice.setCards(cards);

		return slice;
	}

	public Long createSnackReview(SnackReviewServiceDto.Create dto) {
		SnackReview snackReview = dtoMapper.createDtoToEntity(dto);

		return snackReviewRepository.save(snackReview).getId();
	}

	public Long updateSnackReview(SnackReviewServiceDto.Update dto) {
		SnackReview snackReview = findVerifiedOne(dto.getId());
		snackReview.updateContent(dto.getContent());
		snackReview.setScore(dto.getScore());

		return snackReview.getId();
	}

	public void deleteSnackReview(Long id) {
		SnackReview snackReview = findVerifiedOne(id);
		snackReviewRepository.delete(snackReview);
	}

	@Transactional(readOnly = true)
	public SnackReview findVerifiedOne(Long id) {
		Optional<SnackReview> found = snackReviewRepository.findById(id);

		return found.orElseThrow(
			() -> new RuntimeException("SNACK_REVIEW_NOT_FOUND")
		);
	}

	private boolean hasNext(List<SnackReviewResponseDto.Card> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}
}
