package seb.project.Codetech.snackreview.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.global.auditing.BaseTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class SnackReview extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// @Column(nullable = false)
	// private ProductType type;

	@Column(nullable = false) // JSON 매핑하는 방법이 여러가지 있어서 공부해보고 완성하겠습니다
	private String score;

	// @Column(nullable = false) // 조회수 넣을까요?
	// private int views;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String content;
}
