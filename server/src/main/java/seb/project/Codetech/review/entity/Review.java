package seb.project.Codetech.review.entity;

import static seb.project.Codetech.review.entity.QReview.*;
import static seb.project.Codetech.review.entity.QReviewComment.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.global.converter.TypeConverter;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.recommend.entity.Recommend;
import seb.project.Codetech.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	@Convert(converter = TypeConverter.class)
	private Type type;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;

	@Column(nullable = false)
	private String writer;

	@Column(nullable = false)
	private Long view;

	@Column(nullable = false)
	private Long RecommendNumber = 0L;

	@Column(nullable = false)
	private Long commentCount = 0L;

	@Column(nullable = false)
	private LocalDateTime commentUpdatedAt = LocalDateTime.now(); // commentCount가 마지막으로 업데이트된 시간

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	private Product product;

	@OneToMany(mappedBy = "review")
	private List<Recommend> recommends = new ArrayList<>();

	@OneToMany(mappedBy = "review")
	private List<ReviewComment> reviewComments = new ArrayList<>();

	// @OneToMany(mappedBy = "review", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	// private List<FileEntity> fileEntities = new ArrayList<>();

	public void setUser(User user) {
		if (this.user != null) {
			this.user.getReviews().remove(this);
		}
		this.user = user;
		user.getReviews().add(this);
	}

	public void setProduct(Product product) {
		if (this.product != null) {
			this.product.getReviews().remove(this);
		}
		this.product = product;
		product.getReviews().add(this);
	}

	public void updateCommentCount(JPAQueryFactory queryFactory) {
		if (LocalDateTime.now()
			.minusMinutes(30) // 댓글이 자주 업데이트될 것이 예상되면 시간을 줄이는 등 조치를 취해야 함.
			.isBefore(this.commentUpdatedAt)) {
			return;
		}

		var commentCount = queryFactory.select(reviewComment.count())
			.from(reviewComment)
			.where(reviewComment.review.id.eq(this.id)).fetchOne();
		var commentUpdatedAt = LocalDateTime.now();

		queryFactory.update(
				review
			)
			.set(review.commentCount, commentCount)
			.set(review.commentUpdatedAt, commentUpdatedAt)
			.where(review.id.eq(this.id))
			.execute();

		this.commentCount = commentCount;
		this.commentUpdatedAt = commentUpdatedAt;
	}
}
