package seb.project.Codetech.question.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class QuestionRequestDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Get {
		private long lastId;
		private int size;
		private boolean adoption;
		private boolean asc;
	}
}
