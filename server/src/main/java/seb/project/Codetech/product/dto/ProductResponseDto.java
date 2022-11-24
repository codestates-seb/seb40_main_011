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
	public static class selectProduct {
		private Type type;
	}
}
