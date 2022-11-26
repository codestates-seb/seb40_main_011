package seb.project.Codetech.snackreview.controller;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.event.dto.SnackReviewUpdateEvent;
import seb.project.Codetech.productstat.service.ProductStatService;
import seb.project.Codetech.snackreview.dto.SnackReviewRequestDto;
import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.snackreview.mapper.SnackReviewControllerMapper;
import seb.project.Codetech.snackreview.service.SnackReviewService;

@RestController
@RequestMapping("/api/snack-reviews")
@RequiredArgsConstructor
@Validated
public class SnackReviewController {
	private final SnackReviewService snackReviewService;
	private final ProductStatService productStatService;
	private final ApplicationEventPublisher applicationEventPublisher;
	private final SnackReviewControllerMapper dtoMapper;

	@GetMapping
	public ResponseEntity<SnackReviewResponseDto.Slice> getSlice(@ModelAttribute SnackReviewRequestDto.Get params) {
		SnackReviewResponseDto.Slice slice = snackReviewService.readSlice(params);

		return ResponseEntity.ok().body(slice);
	}

	@GetMapping("/stats")
	public ResponseEntity<SnackReviewResponseDto.Info> getStats(@RequestParam Long productId) {
		SnackReviewResponseDto.Info info =
			new SnackReviewResponseDto.Info(productStatService.findVerifiedOne(productId));

		return ResponseEntity.ok().body(info);
	}

	@PostMapping
	public ResponseEntity<Long> postSnackReview(
		@AuthenticationPrincipal String loginEmail,
		@Valid @RequestBody SnackReviewRequestDto.Post request
	) {
		SnackReviewServiceDto.Create createDto = dtoMapper.postDtoToCreateDto(loginEmail, request);
		SnackReview created = snackReviewService.createSnackReview(createDto);
		Long createdId = created.getId();

		applicationEventPublisher.publishEvent(
			new SnackReviewUpdateEvent(created.getProduct().getId()));

		return ResponseEntity.status(HttpStatus.CREATED).body(createdId);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchSnackReview(
		@Positive @PathVariable Long id,
		@Valid @RequestBody SnackReviewRequestDto.Patch request
	) {
		SnackReviewServiceDto.Update updateDto = dtoMapper.patchDtoToUpdateDto(id, request);
		SnackReview updated = snackReviewService.updateSnackReview(updateDto);
		Long updatedId = updated.getId();

		applicationEventPublisher.publishEvent(
			new SnackReviewUpdateEvent(updated.getProduct().getId()));

		return ResponseEntity.ok().body(updatedId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSnackReview(@Positive @PathVariable Long id) {
		SnackReview deleted = snackReviewService.deleteSnackReview(id);

		applicationEventPublisher.publishEvent(
			new SnackReviewUpdateEvent(deleted.getProduct().getId()));

		return ResponseEntity.noContent().build();
	}
}
