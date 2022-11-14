package seb.project.Codetech.user.entity;

import lombok.Getter;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String displayname;

    @Column
    private String image;

    @Column(nullable = false)
    private Long point;

    @Column(nullable = false)
    private Boolean status;

}
