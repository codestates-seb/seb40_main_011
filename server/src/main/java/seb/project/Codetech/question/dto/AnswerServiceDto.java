package seb.project.Codetech.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class AnswerServiceDto {

	@Getter
	@AllArgsConstructor
	public static class Create {
		private String email;
		private Long questionId;
		private String content;
	}
}
