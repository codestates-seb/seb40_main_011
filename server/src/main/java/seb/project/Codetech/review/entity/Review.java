package seb.project.Codetech.review.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.file.entity.FileEntity;
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

	@OneToMany(mappedBy = "review", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<FileEntity> fileEntities = new ArrayList<>();

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
}
