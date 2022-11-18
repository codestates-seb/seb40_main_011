package seb.project.Codetech.snackreview.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.snackreview.entity.ReviewScore;

public class SnackReviewControllerDto {
	@Getter
	@NoArgsConstructor
	public static class Post {
		@NotNull
		private ReviewScore score;
		@NotBlank
		private String content;
		@Positive
		private Long productId;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@NotNull
		private ReviewScore score;
		@NotBlank
		private String content;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Get {
		@Positive
		private Long productId;
		private long offset;
		private int limit;
		private boolean sortByGrade;
		private boolean asc;
	}
}
