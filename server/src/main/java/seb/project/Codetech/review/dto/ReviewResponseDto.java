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
		private String thumbnail;
		private LocalDateTime createdAt;
		private Long userId;
		private String userImage;
		private Long productId;
		private String productName;
		private String productDetail;
		@Setter
		private List<Long> recommends = new ArrayList<>();
		@Setter
		private List<Comment> reviewComments = new ArrayList<>();
	}

	@Getter
	@NoArgsConstructor
	public static class Comment {
		private Long id;
		private Long userId;
		private String writer;
		private String userImage;
		private String content;
		private Comment parent;
		private LocalDateTime createdAt;
		@Setter
		private List<Comment> child = new ArrayList<>();
	}

	@Getter
	@NoArgsConstructor
	public static class Search {
		private Long id;
		private String title;
		private String content;
		private Long RecommendNumber;
		private String writer;
		private String thumbnail;
		private String userImage;
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
		private String thumbnail;
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
		private String thumbnail;
		private Long commentCount;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Slice {
		private List<?> reviewLists;
		private boolean hasNext;
	}
}
