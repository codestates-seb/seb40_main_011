package seb.project.Codetech.question.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.user.entity.User;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Answer extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "MEDIUMTEXT", nullable = false)
	private String content;

	@ManyToOne
	@JoinColumn(name = "question_id")
	private Question question;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public void setQuestion(Question question) {
		this.question = question;

		if (!question.getAnswers().contains(this)) {
			question.getAnswers().add(this);
		}
	}

	public void setUser(User user) {
		this.user = user;

		if (!user.getAnswers().contains(this)) {
			user.getAnswers().add(this);
		}
	}
}
