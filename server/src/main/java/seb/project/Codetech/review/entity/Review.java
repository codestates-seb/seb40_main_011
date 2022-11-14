package seb.project.Codetech.review.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.product.entity.Type;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// 작성자 식별자
	// 제품 식별자

	@Column(nullable = false)
	private Type type;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, columnDefinition = "LONGTEXT")
	private String content;

	private String thumbnailImg;
	private String reviewImg;
}
