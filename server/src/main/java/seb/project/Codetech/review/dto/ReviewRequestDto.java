package seb.project.Codetech.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Type;

public class ReviewRequestDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		private String title;
		private String content;
		private Type type;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		private Long id;
		private String title;
		private String content;
		private Type type;
	}
}