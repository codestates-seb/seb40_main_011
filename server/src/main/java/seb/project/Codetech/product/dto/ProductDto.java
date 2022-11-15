package seb.project.Codetech.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.product.entity.Type;

public class ProductDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		private String name;
		private Type type;
		private String image;
		private String detail;
	}

	@Getter @Setter
	@NoArgsConstructor
	public static class Get {
		private Long id;
	}

	@Getter @Setter
	@NoArgsConstructor
	public static class Response {
		private String name;
		private Type type;
		private String image;
		private String detail;
	}
}
