package seb.project.Codetech.review.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import seb.project.Codetech.review.dto.ReviewCommRequestDto;
import seb.project.Codetech.review.entity.ReviewComment;
import seb.project.Codetech.review.mapper.ReviewCommMapper;
import seb.project.Codetech.review.service.ReviewCommService;

@RestController
@RequestMapping("/api/review-comm")
public class ReviewCommController {
	private final ReviewCommService reviewCommService;
	private final ReviewCommMapper mapper;

	public ReviewCommController(ReviewCommService reviewCommService, ReviewCommMapper mapper) {
		this.reviewCommService = reviewCommService;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity<Long> postReviewComm(@AuthenticationPrincipal String email,
		@RequestBody @Valid ReviewCommRequestDto.Post request) {

		ReviewComment reviewComment = mapper.reviewCommPostRequestDtoToReviewComment(request);
		Long createReviewComm =
			reviewCommService.createReviewComm(email, request.getReviewId(), request.getParentId(), reviewComment);
		// 다시 리뷰 페이지로 돌아가기 위해 리뷰 아이디를 반환한다.

		return ResponseEntity.status(HttpStatus.CREATED).body(createReviewComm);
	}

	@PatchMapping
	public ResponseEntity<Long> patchReviewComm(@AuthenticationPrincipal String email,
		@RequestBody @Valid ReviewCommRequestDto.Patch request) {

		ReviewComment reviewComment = mapper.reviewCommPatchRequestDtoToReviewComment(request);
		Long modifyReviewComm = reviewCommService.modifyReviewComm(email, reviewComment);
		// 다시 리뷰 페이지로 돌아가기 위해 리뷰 아이디를 반환한다.

		return ResponseEntity.ok(modifyReviewComm);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ReviewComment> deleteReviewComm(@AuthenticationPrincipal String email,
		@PathVariable Long id) {

		reviewCommService.disableReviewComm(email, id);

		return ResponseEntity.ok().build();
	}
}
