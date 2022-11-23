package seb.project.Codetech.snackreview.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.redis.entity.ProductStat;
import seb.project.Codetech.snackreview.entity.ReviewScore;

public class SnackReviewResponseDto {
	@Getter
	@NoArgsConstructor
	public static class Info {
		private long total;
		private double avgCe;
		private double avgQlt;
		private double avgStf;
		private double avgDsn;
		private double avgPerf;

		public Info(ProductStat productStat) {
			this.total = productStat.getTotal();
			this.avgCe = productStat.getAvgCe();
			this.avgQlt = productStat.getAvgQlt();
			this.avgStf = productStat.getAvgStf();
			this.avgDsn = productStat.getAvgDsn();
			this.avgPerf = productStat.getAvgPerf();
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
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
		private ReviewScore score;
		private String content;
		private LocalDateTime createdAt;
	}
}
