package seb.project.Codetech.review.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.service.FileService;
import seb.project.Codetech.review.dto.ReviewRequestDto;
import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.mapper.ReviewMapper;
import seb.project.Codetech.review.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@Log4j2
public class ReviewController {

	private final ReviewService reviewService;
	private final FileService fileService;
	private final ReviewMapper mapper;

	public ReviewController(ReviewService reviewService, FileService fileService, ReviewMapper mapper) {
		this.reviewService = reviewService;
		this.fileService = fileService;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity<List<ReviewResponseDto.Post>> postReview(@AuthenticationPrincipal String email,
		@RequestPart @Valid ReviewRequestDto.Post request,
		@RequestPart List<MultipartFile> file) throws IOException {

		Review postReview = mapper.reviewRequestDtoToPostReview(request);
		Review serviceReview = reviewService.createReview(email, request.getProductId(), postReview);
		List<FileEntity> fileEntities = fileService.insertFiles(file);
		fileService.setUploadReview(serviceReview, fileEntities);
		List<ReviewResponseDto.Post> reviewPost = reviewService.responseReviewPost(serviceReview);

		return ResponseEntity.status(HttpStatus.CREATED).body(reviewPost);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Review> patchReview(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id,
		@RequestPart @Valid ReviewRequestDto.Patch request,
		@RequestPart List<MultipartFile> file) throws IOException {

		Review patchReview = mapper.reviewRequestDtoToPatchReview(id, request);
		Review serviceReview = reviewService.modifyReview(email, id, request.getProductId(), patchReview);
		List<FileEntity> fileEntities = fileService.insertFiles(file);
		fileService.setUploadReview(serviceReview, fileEntities);

		return ResponseEntity.ok(serviceReview);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Review> deleteReview(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id) {

		reviewService.removeReview(email, id);

		return ResponseEntity.ok().build();
	}
}