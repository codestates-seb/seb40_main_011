package seb.project.Codetech.snackreview.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.snackreview.entity.Score;

public class SnackReviewResponseDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Info {
		private long total;
		private double avgCe;
		private double avgQlt;
		private double avgStf;
		private double avgDsn;
		private double avgPerf;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Slice {
		private boolean hasNext;
		private List<Card> cards;
	}

	@Getter
	@NoArgsConstructor
	public static class Card {
		private Long id;
		private String nickname;
		private String image;
		private Score score;
		private String content;
	}
}
