package seb.project.Codetech.snackreview.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.Score;

public class SnackReviewControllerDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		@NotNull
		private Score score;
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
		private Score score;
		@NotBlank
		private String content;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class GetFirst {
		@Positive
		private Long productId;
		private int firstSize;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class GetMore {
		@Positive
		private Long productId;
		private int firstSize;
		private int count;
		private int size;
		private String sort;
		private String order;
	}
}
