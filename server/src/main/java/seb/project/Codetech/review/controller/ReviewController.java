package seb.project.Codetech.review.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.context.ApplicationEventPublisher;
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
import seb.project.Codetech.event.dto.ReviewUpdateEvent;
import seb.project.Codetech.file.service.FileService;
import seb.project.Codetech.review.dto.ReviewRequestDto;
import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.entity.Sort;
import seb.project.Codetech.review.mapper.ReviewMapper;
import seb.project.Codetech.review.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@Log4j2
public class ReviewController {

	private final ReviewService reviewService;
	private final FileService fileService;
	private final ApplicationEventPublisher applicationEventPublisher;
	private final ReviewMapper mapper;

	public ReviewController(ReviewService reviewService, FileService fileService, ReviewMapper mapper,
		ApplicationEventPublisher applicationEventPublisher) {
		this.reviewService = reviewService;
		this.fileService = fileService;
		this.applicationEventPublisher = applicationEventPublisher;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity<Long> postReview(@AuthenticationPrincipal String email,
		@RequestBody @Valid ReviewRequestDto.Post request) {

		Review postReview = mapper.reviewRequestDtoToPostReview(request);
		Review serviceReview = reviewService.createReview(email, request.getProductId(), postReview);

		applicationEventPublisher.publishEvent(
			new ReviewUpdateEvent(request.getProductId()));

		return ResponseEntity.status(HttpStatus.CREATED).body(serviceReview.getId());
	}

	@PatchMapping
	public ResponseEntity<Long> patchReview(@AuthenticationPrincipal String email,
		@RequestBody @Valid ReviewRequestDto.Patch request) {

		Review patchReview = mapper.reviewRequestDtoToPatchReview(request);
		Review serviceReview = reviewService.modifyReview(email, request.getProductId(), patchReview);

		applicationEventPublisher.publishEvent(
			new ReviewUpdateEvent(request.getProductId()));

		return ResponseEntity.ok(serviceReview.getId());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Review> deleteReview(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id) {

		Long productId = reviewService.removeReview(email, id);
		applicationEventPublisher.publishEvent(new ReviewUpdateEvent(productId));

		return ResponseEntity.ok().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ReviewResponseDto.Page> getReview(@PathVariable Long id) {
		ReviewResponseDto.Page loadReview = reviewService.loadReview(id);

		return ResponseEntity.ok(loadReview);
	}

	@GetMapping("/best")
	public ResponseEntity<List<ReviewResponseDto.Best>> getBestReview(@RequestParam Integer size) {

		List<ReviewResponseDto.Best> loadBestReview = reviewService.loadBestReview(size);

		return ResponseEntity.ok(loadBestReview);
	}

	@GetMapping("/search")
	public ResponseEntity<ReviewResponseDto.Slice> getSearchReview(@RequestParam String keyword,
		@RequestParam Long offset,
		@RequestParam int limit) {

		ReviewResponseDto.Slice reviewSlice = reviewService.searchReview(keyword, offset, limit);

		return ResponseEntity.ok(reviewSlice);
	}

	@GetMapping("/product")
	public ResponseEntity<ReviewResponseDto.Slice> getListReview(@RequestParam Long id,
		@RequestParam Sort sort,
		@RequestParam Long offset,
		@RequestParam int limit) {

		ReviewResponseDto.Slice productSlices = reviewService.loadSliceReview(id, sort, offset, limit);

		return ResponseEntity.ok(productSlices);
	}
}
