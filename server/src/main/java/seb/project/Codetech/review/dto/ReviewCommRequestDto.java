package seb.project.Codetech.review.dto;

import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReviewCommRequestDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		@Positive
		private Long reviewId;
		@PositiveOrZero
		private Long parentId;
		@Size(max = 500)
		private String content;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@Positive
		private Long id;
		@Size(max = 500)
		private String content;
	}
}
