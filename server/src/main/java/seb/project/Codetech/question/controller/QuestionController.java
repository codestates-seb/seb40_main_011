package seb.project.Codetech.question.controller;

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
import seb.project.Codetech.question.dto.QuestionRequestDto;
import seb.project.Codetech.question.dto.QuestionResponseDto;
import seb.project.Codetech.question.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@Validated
public class QuestionController {
	private final QuestionService questionService;

	@GetMapping
	public ResponseEntity<QuestionResponseDto.Slice> getQuestions(@ModelAttribute QuestionRequestDto.Get params) {
		QuestionResponseDto.Slice slice = questionService.readQuestion(params);

		return ResponseEntity.ok().body(slice);
	}

	@PostMapping
	public ResponseEntity<Long> postQuestion(
		@AuthenticationPrincipal String loginEmail, @Valid @RequestBody QuestionRequestDto.Post request) {
		Long createdId = questionService.createQuestion(loginEmail, request.getContent());

		return ResponseEntity.status(HttpStatus.CREATED).body(createdId);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchQuestion(
		@Positive @PathVariable Long id, @Valid @RequestBody QuestionRequestDto.Patch request) {
		Long updatedId = questionService.updateQuestion(id, request.getContent());

		return ResponseEntity.ok().body(updatedId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteQuestion(@Positive @PathVariable Long id) {
		questionService.deleteQuestion(id);

		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/adopt")
	public ResponseEntity<QuestionResponseDto.Adopt> adoptAnswer(@Positive @PathVariable Long id,
		@Valid @RequestBody QuestionRequestDto.Adopt request) {
		Long adoptedId = questionService.adoptAnswer(id, request.getAnswerId());

		return ResponseEntity.ok()
			.body(new QuestionResponseDto.Adopt(id, adoptedId));
	}

	@PatchMapping("/{id}/adopt")
	public ResponseEntity<QuestionResponseDto.CancelAdoption> cancelAdoption(@Positive @PathVariable Long id) {
		Long canceledId = questionService.cancelAdoption(id);

		return ResponseEntity.ok()
			.body(new QuestionResponseDto.CancelAdoption(id, canceledId));
	}
}
