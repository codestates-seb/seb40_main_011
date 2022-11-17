package seb.project.Codetech.snackreview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.Score;
import seb.project.Codetech.user.entity.User;

public class SnackReviewServiceDto {
	@Getter
	@Builder
	@AllArgsConstructor
	public static class Create {
		private Score score;
		private String content;
		private Type type;
		private User user;
		private Product product;

	}

	@Getter
	@Builder
	@AllArgsConstructor
	public static class Update {
		private Long id;
		private Score score;
		private String content;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	public static class Search {
		private Long productId;
		private int offset;
		private int limit;
		private String sort;
		private String order;
	}
}
