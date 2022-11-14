package seb.project.Codetech.discount.entity;

import lombok.Getter;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class DiscountComment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String content;

}
