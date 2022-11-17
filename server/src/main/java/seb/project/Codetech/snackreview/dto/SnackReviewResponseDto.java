package seb.project.Codetech.snackreview.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class SnackReviewResponseDto {
	@Getter
	public static class First {
		private long total;
		private float avgCe;
		private float avgQlt;
		private float avgStf;
		private float avgDsn;
		private float avgPerf;
		private boolean hasNext;
		private List<Card> cards;
	}

	@Getter
	public static class More {
		private boolean hasNext;
		private List<Card> cards;
	}

	@Getter
	@NoArgsConstructor
	public static class Card {
		private String nickName;
		private String image;
		private int costEfficiency;
		private int quality;
		private int satisfaction;
		private int design;
		private int performance;
		private String content;
	}
}
