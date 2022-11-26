package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import seb.project.Codetech.question.entity.Question;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UserAndQuestionsDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
    private Page<MyQuestionCard> questions;

    @NoArgsConstructor
    @Getter
    public static class MyQuestionCard{
        private Long id;
        private Long adoptedId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long writerId;
        private String writerNickname;
        private String writerImage;

        public MyQuestionCard(Question question){
            this.id = question.getId();
            this.adoptedId = question.getAdoptedId();
            this.content = question.getContent();
            this.createdAt = question.getCreatedAt();
            this.modifiedAt = question.getModifiedAt();
            this.writerId = question.getWriter().getId();
            this.writerNickname = question.getWriter().getNickname();
            this.writerImage = question.getWriter().getImage();
        }
    }
}
