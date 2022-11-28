package seb.project.Codetech.review.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.product.entity.Type;

public class ReviewResponseDto {

	@Getter
	@NoArgsConstructor
	public static class Page {
		private String title;
		private String content;
		private Long view;
		private Type type;
		private String writer;
		private Long userId;
		private String userImage;
		private String productName;
		private String productDetail;
		@Setter
		private List<Comment> reviewComments;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Comment {
		private Long id;
		private Long userId;
		private String userImage;
		private String content;
		private Comment parent;
		private List<Comment> child = new ArrayList<>();
	}

	@Getter
	@NoArgsConstructor
	public static class Best {
		private Long id;
		private String title;
		private String content;
		private Long RecommendNumber;
		private Type type;
		private String writer;
		private LocalDateTime createdAt;
		private String image;
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Slice {
		private boolean hasNext;
		private List<Page> pages;
	}
}
