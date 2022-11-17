package seb.project.Codetech.snackreview.service;

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
	public SnackReviewResponseDto.First readFirst(SnackReviewControllerDto.GetFirst params) {
		return null;
	}

	@Transactional(readOnly = true)
	public SnackReviewResponseDto.More readMore(SnackReviewControllerDto.GetMore params) {
		return null;
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
}
