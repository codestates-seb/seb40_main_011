package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.question.entity.Question;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserAndQuestionsDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
    private List<MyQuestionCard> questions;

    @NoArgsConstructor
    @Getter
    public static class MyQuestionCard{
        private Long id;
        private Long adoptedId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public MyQuestionCard(Question question){
            this.id = question.getId();
            this.adoptedId = question.getAdoptedId();
            this.content = question.getContent();
            this.createdAt = question.getCreatedAt();
            this.modifiedAt = question.getModifiedAt();
        }
    }
}
