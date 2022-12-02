package seb.project.Codetech.product.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.product.entity.Type;

public class ProductResponseDto {

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Post {
		private String name;
		private Type type;
		private String detail;
		private String thumbnail;
		private String modifier;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Patch {
		private String name;
		private Type type;
		private String detail;
		private String thumbnail;
		private String writer;
		private String modifier;
	}

	@Getter
	@NoArgsConstructor
	public static class Get {
		private Long id;
		private String name;
		private String detail;
		private String thumbnail;
		private Type type;
		private String writer;
		private String modifier;
		private LocalDateTime createdAt;
	}

	@Getter
	@NoArgsConstructor
	public static class Select {
		private Long id;
		private String name;
	}

	@Getter
	@AllArgsConstructor
	public static class MainPage {
		List<Card> cards;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Card {
		private Long id;
		private String name;
		private String thumbnail;
		private Type type;
		private LocalDateTime createdAt;
		private String filePath;
		private long reviewCount;
		private long snackCount;
		private double avgScore;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Search {
		private Long id;
		private String name;
		private String thumbnail;
		private Type type;
		private Long reviewCount;
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
