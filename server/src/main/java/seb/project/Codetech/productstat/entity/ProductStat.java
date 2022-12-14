package seb.project.Codetech.productstat.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Getter;

@Getter
@RedisHash("product_stat")
public class ProductStat {
	@Id
	private Long id;
	private long snackCount;
	private long reviewCount;
	private double avgCe;
	private double avgQlt;
	private double avgStf;
	private double avgDsn;
	private double avgPerf;
	private double avgScore;

	public void setId(Long productId) {
		this.id = productId;
	}

	public void updateReviewCount(long reviewCount) { this.reviewCount = reviewCount; }

	public void calculateAvgScore() {
		this.avgScore = (avgCe + avgQlt + avgStf + avgDsn + avgPerf) / 5;
	}
}
