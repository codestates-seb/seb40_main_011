package seb.project.Codetech.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReviewCommRequestDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		private Long reviewId;
		private Long parentId;
		private String content;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		private String content;
	}
}
