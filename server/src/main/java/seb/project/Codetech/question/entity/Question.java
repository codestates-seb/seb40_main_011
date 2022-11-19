package seb.project.Codetech.question.entity;

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

	private Question(String content) {
		this.content = content;
	}

	public static Question from(String content) {
		return new Question(content);
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

	public void updateToDeleted() {
		this.content = "삭제됨";
		this.deleted = true;
	}

	public void checkUpdatable() {
		if (this.answers.isEmpty()) {
			return;
		}
		
		throw new RuntimeException("UPDATE_NOT_ALLOWED");
	}

	public boolean isDeletable() {
		if (this.pickId == null) {
			return true;
		}

		return false;
	}
}
