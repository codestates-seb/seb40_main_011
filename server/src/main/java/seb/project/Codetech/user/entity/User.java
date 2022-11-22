package seb.project.Codetech.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.discount.entity.DiscountComment;
import seb.project.Codetech.file.entity.FileEntity;
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

	@Column(nullable = false, unique = true, updatable = false)
	private String email;

	@Column(nullable = false, length = 100)
	private String password;

	@Column(nullable = false)
	private String nickname;

	@Column
	private String image;

	@Column(nullable = false)
	private Long point = 0L;

	@Column(nullable = false)
	private Boolean status = false;

	public void updatePoint(int diff) {
		this.point += diff;
	}

public User(String nickname, String email, String password) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Review> reviews = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Recommend> recommends = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<ReviewComment> reviewComments = new ArrayList<>();

	@OneToMany(mappedBy = "writer")
	private List<SnackReview> snackReviews = new ArrayList<>();

	@OneToMany(mappedBy = "writer")
	private List<Question> questions = new ArrayList<>();

	@OneToMany(mappedBy = "writer")
	private List<Answer> answers = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<DiscountComment> discountComments = new ArrayList<>();

	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private FileEntity file;

	public void setFile(FileEntity file){
		this.file = file;
		file.setUser(this);
	}
}
