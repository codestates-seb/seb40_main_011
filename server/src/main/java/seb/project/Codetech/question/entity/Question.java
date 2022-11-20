package seb.project.Codetech.question.entity;

import static seb.project.Codetech.global.exception.ExceptionCode.*;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.user.entity.User;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Question extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private Long pickId;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;

	@Column
	private boolean deleted = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id")
	private User writer;

	@OneToMany(mappedBy = "question")
	private List<Answer> answers = new ArrayList<>();

	public static Question from(String content) {
		Question question = new Question();
		question.content = content;

		return question;
	}

	public void setWriter(User user) {
		if (this.writer != null) {
			this.writer.getQuestions().remove(this);
		}
		this.writer = user;
		user.getQuestions().add(this);
	}

	public void updateContent(String content) {
		this.content = content;
	}

	public void adopt(Long answerId) {
		this.pickId = answerId;
	}

	public void updateToDeleted() {
		this.content = "삭제됨";
		this.deleted = true;
	}

	public void checkUpdatable() {
		if (!this.answers.isEmpty()) {
			throw new BusinessLogicException(QUESTION_UPDATE_NOT_ALLOWED);
		}
	}

	public boolean isDeletable() {
		return this.pickId == null;
	}

	public void checkAdoptable() {
		if (this.pickId != null) {
			throw new BusinessLogicException(ADOPTED_ANSWER_EXIST);
		}
	}
}
