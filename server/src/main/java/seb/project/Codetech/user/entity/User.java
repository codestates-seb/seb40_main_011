package seb.project.Codetech.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.discount.entity.DiscountComment;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.entity.Question;
import seb.project.Codetech.recommend.entity.Recommend;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.entity.ReviewComment;
import seb.project.Codetech.snackreview.entity.SnackReview;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class User extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String nickname;

	@Column
	private String image;

	@Column(nullable = false)
	private Long point = 0L;

	@Column(nullable = false)
	private Boolean status = false;

	@OneToMany(mappedBy = "user")
	private List<Review> reviews = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Recommend> recommends = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<ReviewComment> reviewComments = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<SnackReview> snackReviews = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Question> questions = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Answer> answers = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<DiscountComment> discountComments = new ArrayList<>();
}
