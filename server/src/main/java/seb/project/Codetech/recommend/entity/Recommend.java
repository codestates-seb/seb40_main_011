package seb.project.Codetech.recommend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Recommend extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "review_id")
	private Review review;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public void setReview(Review review) {
		if (this.review != null) {
			review.getRecommends().remove(this);
		}
		this.review = review;
		review.getRecommends().add(this);
	}

	public void setUser(User user) {
		if (this.user != null) {
			user.getRecommends().remove(this);
		}
		this.user = user;
		user.getRecommends().add(this);
	}
}
