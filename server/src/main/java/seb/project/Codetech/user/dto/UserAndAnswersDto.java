package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.entity.Question;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UserAndAnswersDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
    private Page<MyAnsweredQuestionCard> questions;

    @NoArgsConstructor
    @Getter
    public static class MyAnsweredQuestionCard{
        private Long id;
        private Long adoptedId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long writerId;
        private String writerNickname;
        private String writerImage;
        private Page<QuestionAnswer> answers;

        public MyAnsweredQuestionCard(Question question, Page<QuestionAnswer> questionAnswer){
            this.id = question.getId();
            this.adoptedId = question.getAdoptedId();
            this.content = question.getContent();
            this.createdAt = question.getCreatedAt();
            this.modifiedAt = question.getModifiedAt();
            this.writerId = question.getWriter().getId();
            this.writerNickname = question.getWriter().getNickname();
            this.writerImage = question.getWriter().getImage();
            this.answers = questionAnswer;
        }
        @Getter
        @NoArgsConstructor
        public static class QuestionAnswer {
            private Long id;
            private String content;
            private LocalDateTime createdAt;
            private LocalDateTime modifiedAt;

            public QuestionAnswer(Answer answer){
                this.id = answer.getId();
                this.content = answer.getContent();
                this.createdAt = answer.getCreatedAt();
                this.modifiedAt = answer.getModifiedAt();
            }
        }

    }


}