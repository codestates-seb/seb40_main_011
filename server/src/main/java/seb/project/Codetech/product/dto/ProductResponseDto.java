package seb.project.Codetech.product.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.product.entity.Type;

public class ProductResponseDto {

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Post {
		private String name;
		private Type type;
		private String detail;
		private String modifier;
		private List<FileEntity> fileEntities;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Patch {
		private String name;
		private Type type;
		private String detail;
		private String writer;
		private String modifier;
		private List<FileEntity> fileEntities;
	}

	@Getter
	@NoArgsConstructor
	public static class Select {
		private String name;
	}

	@Getter @Setter
	@NoArgsConstructor
	public static class Category {
		private Long id;
		private String name;
		private Type type;
		private String fileName;
		private String filePath;
		private Long reviewCount;

		public Category(Long id, String name, Type type, String fileName, String filePath, Long reviewCount) {
			this.id = id;
			this.name = name;
			this.type = type;
			this.fileName = fileName;
			this.filePath = filePath;
			this.reviewCount = reviewCount;
		}
	}
}
