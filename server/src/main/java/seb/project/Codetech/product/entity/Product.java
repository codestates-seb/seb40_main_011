package seb.project.Codetech.product.entity;

import javax.persistence.Column;
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
public class Product extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private Type type;

	@Column(nullable = false)
	private String image;

	@Column(nullable = false, columnDefinition = "LONGTEXT")
	private String detail;
}
