package seb.project.Codetech.review.controller;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.review.dto.ReviewRequestDto;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.mapper.ReviewMapper;
import seb.project.Codetech.review.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@Log4j2
public class ReviewController {

	private final ReviewService reviewService;
	private final ReviewMapper mapper;

	public ReviewController(ReviewService reviewService, ReviewMapper mapper) {
		this.reviewService = reviewService;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity<Long> postReview(@AuthenticationPrincipal String email,
		@RequestBody @Valid ReviewRequestDto.Post request) {

		Review postReview = mapper.reviewRequestDtoToPostReview(request);
		Review serviceReview = reviewService.createReview(email, request.getProductId(), postReview);

		return ResponseEntity.status(HttpStatus.CREATED).body(serviceReview.getId());
	}

	@PatchMapping
	public ResponseEntity<Long> patchReview(@AuthenticationPrincipal String email,
		@RequestBody @Valid ReviewRequestDto.Patch request) {

		Review patchReview = mapper.reviewRequestDtoToPatchReview(request);
		Review serviceReview = reviewService.modifyReview(email, request.getProductId(), patchReview);

		return ResponseEntity.ok(serviceReview.getId());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Review> deleteReview(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id) {

		reviewService.removeReview(email, id);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Review> getReview(@PathVariable Long id) {
		Review loadReview = reviewService.loadReview(id);

		return ResponseEntity.ok(loadReview);
	}

	@GetMapping("/category")
	public ResponseEntity<Review> getTypeSearch(@RequestParam Type type) {
		reviewService.searchTypeReview(type);
		return null;
	}
}