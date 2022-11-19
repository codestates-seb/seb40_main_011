package seb.project.Codetech.question.controller;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.question.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@Validated
public class QuestionController {
	private final QuestionService questionService;

	@PostMapping
	public ResponseEntity<Long> postQuestion(
		@AuthenticationPrincipal String loginEmail, @NotEmpty @RequestBody String content) {
		Long createdId = questionService.createQuestion(loginEmail, content);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdId);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchQuestion(@Positive @PathVariable Long id, @NotEmpty @RequestBody String content) {
		Long updatedId = questionService.updateQuestion(id, content);

		return ResponseEntity.ok().body(updatedId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteMapping(@Positive @PathVariable Long id) {
		questionService.deleteQuestion(id);

		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/adopt")
	public ResponseEntity<Long> adoptAnswer(@Positive @PathVariable Long id, @Positive @RequestBody Long answerId) {
		return ResponseEntity.ok().build();
	}
}
