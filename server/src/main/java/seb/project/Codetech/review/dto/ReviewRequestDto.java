package seb.project.Codetech.review.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReviewRequestDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		@Positive
		private Long productId;
		@Size(max = 50)
		private String title;
		@NotBlank
		private String content;
		@NotBlank
		private String thumbnail;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@Positive
		private Long id;
		@Positive
		private Long productId;
		@Size(max = 50)
		private String title;
		@NotBlank
		private String content;
		@NotBlank
		private String thumbnail;
	}
}