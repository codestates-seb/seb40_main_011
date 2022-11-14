package seb.project.Codetech.discount.entity;

import lombok.Getter;
import lombok.Setter;
import seb.project.Codetech.global.auditing.BaseTime;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Discount extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String content;

    @Column
    private String discountImg;

    @Column(nullable = false)
    private String link;

    public enum Type {
        MONITOR("모니터"),
        MOUSE("마우스"),
        MIKE("마이크"),
        KEYBOARD("키보드"),
        SPEAKER("스피커"),
        LAPTOP("랩탑"),
        GAMEPAD("게임패드"),
        TABLET("타플랫"),
        MODEM("모뎀"),
        HEADSET("해드셋"),
        PHONE("핸드폰"),
        LIGHTBAR("라이트바"),
        WEBCAM("웹캠");

        private String type;

        Type(String type){this.type = type;}
    }

    @Column(nullable = false)
    private Boolean soldOut;

}
