package seb.project.Codetech.product.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.snackreview.entity.SnackReview;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;

	@Column(nullable = false)
	private String image;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String detail;

	@OneToMany(mappedBy = "product")
	private List<Review> reviews = new ArrayList<>();

	@OneToMany(mappedBy = "product")
	private List<SnackReview> snackReviews = new ArrayList<>();
}
