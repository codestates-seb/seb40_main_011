package seb.project.Codetech.review.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.product.entity.Type;

public class ReviewResponseDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Post {
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
		private List<FileEntity> fileEntities;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class TypeSearch {

	}
}
