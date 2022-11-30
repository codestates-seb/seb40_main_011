package seb.project.Codetech.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.review.entity.Sort;

public class ReviewRequestDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		private Long productId;
		private String title;
		private String content;
		private String thumbnail;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Patch {
		private Long id;
		private Long productId;
		private String title;
		private String content;
		private String thumbnail;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Get {
		private Long productId;
		private Sort sort;
		private long offset;
		private int limit;
	}
}