package seb.project.Codetech.productstat.dto;

import lombok.Getter;
import seb.project.Codetech.productstat.entity.ProductStat;

public class ProductStatResponseDto {
	@Getter
	public static class Snack {
		private final long total;
		private final double avgCe;
		private final double avgQlt;
		private final double avgStf;
		private final double avgDsn;
		private final double avgPerf;

		public Snack(ProductStat productStat) {
			this.total = productStat.getSnackCount();
			this.avgCe = productStat.getAvgCe();
			this.avgQlt = productStat.getAvgQlt();
			this.avgStf = productStat.getAvgStf();
			this.avgDsn = productStat.getAvgDsn();
			this.avgPerf = productStat.getAvgPerf();
		}
	}
}
