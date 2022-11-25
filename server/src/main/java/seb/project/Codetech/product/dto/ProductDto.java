package seb.project.Codetech.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Type;

public class ProductDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		private String name;
		private Type type;
		private String detail;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		private Long id;
		private String name;
		private String detail;
	}

	public static class Search {
		private Type type;
	}
}
