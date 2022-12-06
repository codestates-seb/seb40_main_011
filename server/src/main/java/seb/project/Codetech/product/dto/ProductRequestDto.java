package seb.project.Codetech.product.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Type;

public class ProductRequestDto {

	@Getter
	@NoArgsConstructor
	public static class Post {
		@Size(max = 50)
		private String name;
		@NotNull
		private Type type;
		@Size(max = 200)
		private String detail;
	}

	@Getter
	@NoArgsConstructor
	public static class Patch {
		@Positive
		private Long id;
		@Size(max = 50)
		private String name;
		private Type type;
		@Size(max = 200)
		private String detail;
	}
}
