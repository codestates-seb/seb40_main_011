package seb.project.Codetech.recommend.entity;

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
public class Recommend extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	// 리뷰 식별자
	// 멤버 식별자
}
