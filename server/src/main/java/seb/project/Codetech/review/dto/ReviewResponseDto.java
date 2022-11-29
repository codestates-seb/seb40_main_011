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
		private Long RecommendNumber;
		private Type type;
		private String writer;
		private LocalDateTime createdAt;
		private Long userId;
		private String userImage;
		private String productName;
		private String productDetail;
		@Setter
		private List<Comment> reviewComments = new ArrayList<>();
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
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ReviewList {
		private Long id;
		private String title;
		private String content;
		private Long RecommendNumber;
		private LocalDateTime createdAt;
		private String writer;
		private String userImage;
		//private String thumbnail;
		@Setter
		private Long reviewCommCount;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Slice {
		private List<ReviewList> reviewLists;
		private boolean hasNext;
	}
}
