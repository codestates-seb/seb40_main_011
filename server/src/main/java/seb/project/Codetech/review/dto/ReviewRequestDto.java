package seb.project.Codetech.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ReviewRequestDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		private Long productId;
		private String title;
		private String content;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Patch {
		private Long id;
		private Long productId;
		private String title;
		private String content;

	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Get {
		private Long productId;
		private int sort;
		private long offset;
		private int limit;
	}
}