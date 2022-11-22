package seb.project.Codetech.snackreview.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.querydsl.core.annotations.QueryInit;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
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
	@QueryInit("*")
	private ReviewScore score;

	@Column(nullable = false)
	private float grade;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id")
	private User writer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	@QueryInit("id")
	private Product product;

	public static SnackReview from(String content) {
		SnackReview snackReview = new SnackReview();
		snackReview.content = content;

		return snackReview;
	}

	public void setWriter(User user) {
		if (this.writer != null) {
			this.writer.getSnackReviews().remove(this);
		}
		this.writer = user;
		user.getSnackReviews().add(this);
	}

	public void setSubject(Product product) {
		if (this.product != null) {
			this.product.getSnackReviews().remove(this);
		}
		this.product = product;
		this.type = product.getType();
		product.getSnackReviews().add(this);
	}

	public void setScore(ReviewScore score) {
		this.score = score;
		this.grade = score.getGrade();
	}

	public void updateContent(String content) {
		this.content = content;
	}

}
