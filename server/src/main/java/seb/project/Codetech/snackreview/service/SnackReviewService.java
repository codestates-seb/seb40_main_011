package seb.project.Codetech.snackreview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.snackreview.dto.SnackReviewRequestDto;
import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.snackreview.mapper.SnackReviewServiceMapper;
import seb.project.Codetech.snackreview.repository.SnackReviewRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;

@Service
@Transactional
@RequiredArgsConstructor
public class SnackReviewService {
	private final SnackReviewRepository snackReviewRepository;
	private final SnackReviewServiceMapper dtoMapper;
	private final UserService userService;
	private final UserRepository userRepository;

	@Transactional(readOnly = true)
	public SnackReviewResponseDto.Slice readSlice(SnackReviewRequestDto.Get params) {
		List<SnackReviewResponseDto.Card> cards = snackReviewRepository.searchSortedCardsByProductId(params);
		boolean hasNext = snackReviewRepository.hasNext(cards, params.getLimit());

		return new SnackReviewResponseDto.Slice(hasNext, cards);
	}

	public SnackReview createSnackReview(SnackReviewServiceDto.Create dto) {
		SnackReview snackReview = dtoMapper.createDtoToEntity(dto);

		User user = userService.findUser(dto.getLoginEmail());
		user.updatePoint(10);
		userRepository.save(user);
		return snackReviewRepository.save(snackReview);
	}

	public SnackReview updateSnackReview(SnackReviewServiceDto.Update dto) {
		SnackReview snackReview = findVerifiedOne(dto.getId());
		snackReview.updateContent(dto.getContent());
		snackReview.setScore(dto.getScore());

		return snackReview;
	}

	public SnackReview deleteSnackReview(Long id) {
		SnackReview snackReview = findVerifiedOne(id);
		snackReviewRepository.delete(snackReview);

		return snackReview;
	}

	@Transactional(readOnly = true)
	public SnackReview findVerifiedOne(Long id) {
		Optional<SnackReview> found = snackReviewRepository.findById(id);

		return found.orElseThrow(
			() -> new BusinessLogicException(ExceptionCode.SNACK_REVIEW_NOT_FOUND)
		);
	}
}
