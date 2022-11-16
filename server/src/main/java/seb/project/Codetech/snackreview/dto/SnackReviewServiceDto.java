package seb.project.Codetech.snackreview.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.user.entity.User;

public class SnackReviewServiceDto {
	@Getter
	@NoArgsConstructor
	public static class Create {
		private SnackReview.Score score;
		private String content;
		private Type type;
		private User user;
		private Product product;
	}

	@Getter
	@NoArgsConstructor
	public static class Update {
		private Long id;
		private SnackReview.Score score;
		private String content;
	}
}
