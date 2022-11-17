package seb.project.Codetech.snackreview.entity;

import java.lang.reflect.Field;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.validation.annotation.ValidScore;
import seb.project.Codetech.user.entity.User;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class SnackReview extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@Embedded
	private Score score;

	@Column(nullable = false)
	private float grade;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@Builder
	public SnackReview(String content, Type type) {
		this.content = content;
		this.type = type;
	}

	public void setUser(User user) {
		if (this.user != null) {
			this.user.getSnackReviews().remove(this);
		}
		this.user = user;
		user.getSnackReviews().add(this);
	}

	public void setProduct(Product product) {
		if (this.product != null) {
			this.product.getSnackReviews().remove(this);
		}
		this.product = product;
		product.getSnackReviews().add(this);
	}

	public void setScore(Score score) {
		this.score = score;
		this.grade = score.getGrade();
	}

	public void updateContent(String content) {
		this.content = content;
	}

	@Getter
	@ValidScore
	public static class Score {
		private int costEfficiency;
		private int quality;
		private int satisfaction;
		private int design;
		private int performance;

		public float getGrade() {
			float totalScore = 0;
			int totalCount = 0;

			for (Field field : Score.class.getDeclaredFields()) {
				if (field.getName().equals("this$0")) {
					continue;
				}

				try {
					totalScore += field.getInt(this);
				} catch (IllegalAccessException e) {

				} finally {
					totalCount += 1;
				}
			}

			return totalScore / totalCount;
		}
	}
}
