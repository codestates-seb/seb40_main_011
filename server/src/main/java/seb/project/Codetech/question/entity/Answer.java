package seb.project.Codetech.question.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "question_id")
	@QueryInit("id")
	private Question question;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id")
	private User writer;

	public static Answer from(String content) {
		Answer answer = new Answer();
		answer.updateContent(content);

		return answer;
	}

	public void setQuestion(Question question) {
		if (this.question != null) {
			this.question.getAnswers().remove(this);
		}
		this.question = question;
		question.getAnswers().add(this);
	}

	public void setWriter(User user) {
		if (this.writer != null) {
			this.writer.getAnswers().remove(this);
		}
		this.writer = user;
		user.getAnswers().add(this);
	}

	public void updateContent(String content) {
		this.content = content;
	}
}
