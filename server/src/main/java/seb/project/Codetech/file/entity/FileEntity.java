package seb.project.Codetech.file.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "FILE")
public class FileEntity extends BaseTime { // 파일은 업로드 이후 변경하지 않는다.

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String orgName; // 원본 파일 이름

	@Column(nullable = false, updatable = false)
	private String uuidName; // 변경해서 저장할 파일 이름

	@Column(nullable = false)
	private String path;

	@OneToOne
	@JoinColumn(name = "user_id")
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	private User user;

	public void setUser(User user) {
		this.user = user;

	}

	@OneToMany(mappedBy = "file")
	private List<Review> reviews = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	private Product product;

	@ManyToOne
	@JoinColumn(name = "review_id")
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	private Review review;

	public void setProduct(Product product) {
		if (this.product != null)
			this.product.getFileEntities().remove(this);
		this.product = product;
		this.product.getFileEntities().add(this);
	}

	public void setReview(Review review) {
		if (this.review != null)
			this.review.getFileEntities().remove(this);
		this.review = review;
		this.review.getFileEntities().add(this);
	}
}
