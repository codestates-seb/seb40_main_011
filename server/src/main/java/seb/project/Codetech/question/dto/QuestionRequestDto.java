package seb.project.Codetech.question.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class QuestionRequestDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Get {
		private Long lastId;
		private int size;
		private boolean adoption;
		private boolean asc;
	}

	@Getter
	@NoArgsConstructor
	public static class Post {
		@NotEmpty
		private String content;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@NotEmpty
		private String content;
	}

	@Getter
	@NoArgsConstructor
	public static class Adopt {
		@Positive
		private Long answerId;
	}
}
