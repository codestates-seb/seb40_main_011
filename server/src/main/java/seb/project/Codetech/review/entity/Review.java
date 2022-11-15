package seb.project.Codetech.review.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
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

	// 작성자 식별자
	// 제품 식별자

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;

	@Column(nullable = false)
	private Long view = 0L;

	private String thumbnailImg;
	private String reviewImg;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@OneToMany(mappedBy = "review")
	private List<Recommend> recommends = new ArrayList<>();

	@OneToMany(mappedBy = "review")
	private List<ReviewComment> reviewComments = new ArrayList<>();

	public void setUser(User user) {
		if (this.user != null) {
			user.getReviews().remove(this);
		}
		this.user = user;
		user.getReviews().add(this);
	}

	public void setProduct(Product product) {
		if (this.product != null) {
			product.getReviews().remove(this);
		}
		this.product = product;
		product.getReviews().add(this);
	}
}
