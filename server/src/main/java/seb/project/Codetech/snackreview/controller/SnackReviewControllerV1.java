package seb.project.Codetech.snackreview.controller;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

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
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.snackreview.dto.SnackReviewControllerDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.mapper.SnackReviewControllerMapper;
import seb.project.Codetech.snackreview.service.SnackReviewService;

@RestController
@RequestMapping("/api/v1/categories/snackreviews")
@RequiredArgsConstructor
@Validated
public class SnackReviewControllerV1 {
	private final SnackReviewService snackReviewService;
	private final SnackReviewControllerMapper dtoMapper;

	@GetMapping
	public ResponseEntity getFirst(@ModelAttribute SnackReviewControllerDto.GetFirst dto) {
		return ResponseEntity.ok().build();
	}

	@PostMapping("/more")
	public ResponseEntity getMore(@RequestBody SnackReviewControllerDto.GetMore dto) {
		return ResponseEntity.ok().build();
	}

	@PostMapping("/post")
	public ResponseEntity postSnackReview(
		@AuthenticationPrincipal String loginEmail,
		@Valid @RequestBody SnackReviewControllerDto.Post request
	) {
		SnackReviewServiceDto.Create createDto = dtoMapper.postDtoToCreateDto(loginEmail, request);
		Long createdId = snackReviewService.createSnackReview(createDto);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdId);
	}

	@PatchMapping("/{id}")
	public ResponseEntity patchSnackReview(
		@Positive @PathVariable Long id,
		@Valid @RequestBody SnackReviewControllerDto.Patch request
	) {
		SnackReviewServiceDto.Update updateDto = dtoMapper.patchDtoToUpdateDto(id, request);
		Long updatedId = snackReviewService.updateSnackReview(updateDto);

		return ResponseEntity.ok().body(updatedId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteSnackReview(@Positive @PathVariable Long id) {
		snackReviewService.deleteSnackReview(id);

		return ResponseEntity.noContent().build();
	}
}
