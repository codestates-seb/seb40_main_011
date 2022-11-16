package seb.project.Codetech.snackreview.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.SnackReview;

public class SnackReviewControllerDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		@NotNull
		private SnackReview.Score score;
		@NotNull
		private Type type;
		@NotBlank
		private String content;
		@Positive
		private Long productId;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@NotNull
		private SnackReview.Score score;
		@NotBlank
		private String content;
	}
}
