package seb.project.Codetech.question.controller;

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

@RestController
@RequestMapping("/api/questions")
@Validated
public class QuestionController {

	@PostMapping("/post")
	public ResponseEntity postQuestion(@RequestBody String content,
		@AuthenticationPrincipal String loginEmail) {
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity patchQuestion(@Positive @PathVariable Long id,
		@RequestBody String content,
		@AuthenticationPrincipal String loginEmail) {
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteMapping(@Positive @PathVariable Long id) {
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/adopt")
	public ResponseEntity adoptAnswer(@Positive @PathVariable Long id, @RequestBody Long answerId) {
		return ResponseEntity.ok().build();
	}
}
