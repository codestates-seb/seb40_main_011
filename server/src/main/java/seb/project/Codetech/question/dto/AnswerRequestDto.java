package seb.project.Codetech.question.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class AnswerRequestDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		@Positive
		private Long questionId;
		@NotBlank
		private String content;
	}
}
