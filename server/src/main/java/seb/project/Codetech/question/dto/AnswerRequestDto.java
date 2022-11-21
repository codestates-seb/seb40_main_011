package seb.project.Codetech.question.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class AnswerRequestDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		@Positive
		private Long questionId;
		@NotEmpty
		private String content;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@NotEmpty
		private String content;
	}
}
