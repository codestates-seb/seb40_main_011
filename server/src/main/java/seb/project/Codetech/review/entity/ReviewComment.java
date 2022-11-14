package seb.project.Codetech.review.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ReviewComment extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	// 회원 식별자
	// 리뷰 식별자
	// private ReviewComment parentId;
	private String content;
	private Timestamp createdAt;
	private Timestamp modifiedAt;
}
