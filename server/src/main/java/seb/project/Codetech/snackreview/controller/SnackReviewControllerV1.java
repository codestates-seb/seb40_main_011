package seb.project.Codetech.snackreview.controller;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.snackreview.dto.SnackReviewControllerDto;

@RestController
@RequestMapping("/api/v1/categories/snackreviews")
@RequiredArgsConstructor
@Validated
public class SnackReviewControllerV1 {
	@GetMapping
	public ResponseEntity getSnackReview() {
		return ResponseEntity.ok().build();
	}

	@PostMapping
	public ResponseEntity postSnackReview(@Valid @RequestBody SnackReviewControllerDto.Post request) {
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity patchSnackReview(@Positive @PathVariable Long id,
		@Valid @RequestBody SnackReviewControllerDto.Patch request) {
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteSnackReview(@Positive @PathVariable Long id) {
		return ResponseEntity.noContent().build();
	}
}
