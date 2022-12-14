package seb.project.Codetech.snackreview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.ReviewScore;

public class SnackReviewServiceDto {
	@Getter
	@Builder
	@AllArgsConstructor
	public static class Create {
		private ReviewScore score;
		private String content;
		private Type type;
		private String loginEmail;
		private Long productId;

	}

	@Getter
	@Builder
	@AllArgsConstructor
	public static class Update {
		private Long id;
		private ReviewScore score;
		private String content;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	public static class Search {
		private Long productId;
		private long offset;
		private int limit;
		private boolean sortByGrade;
		private boolean asc;
	}
}
