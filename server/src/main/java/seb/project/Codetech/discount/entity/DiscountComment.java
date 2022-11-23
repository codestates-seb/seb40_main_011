package seb.project.Codetech.discount.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;
import seb.project.Codetech.user.entity.User;

@Getter
@Setter
@Entity
public class DiscountComment extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;

	@OneToMany(mappedBy = "parent")
	private List<DiscountComment> child = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "parent_id")
	private DiscountComment parent;

	@ManyToOne
	@JoinColumn(name = "discount_id")
	private Discount discount;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public void setDiscount(Discount discount) {
		if (this.discount != null) {
			this.discount.getDiscountComment().remove(this);
		}
		this.discount = discount;
		discount.getDiscountComment().add(this);
	}

	public void setUser(User user) {
		if (this.user != null) {
			this.user.getDiscountComments().remove(this);
		}
		this.user = user;
		user.getDiscountComments().add(this);
	}

	public void setParent(DiscountComment parent) {
		if (this.parent != null) {
			this.parent.getChild().remove(this);
		}
		this.parent = parent;
		parent.getChild().add(this);
	}
}
