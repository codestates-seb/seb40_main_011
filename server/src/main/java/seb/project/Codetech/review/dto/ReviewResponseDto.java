package seb.project.Codetech.review.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Type;

public class ReviewResponseDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Slice {
		private boolean hasNext;
		private List<Page> pages;
	}

	@Getter
	@NoArgsConstructor
	public static class Page {
		private String title;
		private String content;
		private Long view;
		private Type type;
		private String writer;
		private Long userId;
		private String userNickname;
		private String userImage;
		private String productName;
		private String productDetail;
	}

	@Getter
	@NoArgsConstructor
	public static class Best {
		private String title;
		private String content;
		private Type type;
		private String writer;
		private LocalDateTime createdAt;
		private String image;
	}
}
