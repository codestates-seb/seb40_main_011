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

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.question.dto.AnswerRequestDto;
import seb.project.Codetech.question.dto.AnswerServiceDto;
import seb.project.Codetech.question.mapper.AnswerControllerMapper;
import seb.project.Codetech.question.service.AnswerService;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
@Validated
public class AnswerController {
	private final AnswerService answerService;

	private final AnswerControllerMapper dtoMapper;

	@PostMapping
	public ResponseEntity<Long> postAnswer(
		@AuthenticationPrincipal String loginEmail, @RequestBody AnswerRequestDto.Post request) {
		AnswerServiceDto.Create dto = dtoMapper.requestToCreateDto(loginEmail, request);
		Long createdId = answerService.createdAnswer(dto);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdId);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchAnswer(@Positive @PathVariable Long id, @RequestBody String content) {
		Long updatedId = answerService.updatedAnswer(id, content);

		return ResponseEntity.ok().body(updatedId);
	}

	@DeleteMapping("{id}")
	public ResponseEntity deletedAnswer(@Positive @PathVariable Long id) {
		answerService.deletedAnswer(id);

		return ResponseEntity.noContent().build();
	}
}
