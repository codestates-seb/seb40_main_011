package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.review.entity.Review;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UserAndReviewsDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
    private Page<MyReviewCard> reviews;


    @Getter
    @NoArgsConstructor
    public static class MyReviewCard{
        private Long id;
        private Type type;
        private String title;
        private String content;
        private Long view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        private Long productId;
        private String productName;

        public MyReviewCard(Review review){
            this.id = review.getId();
            this.type = review.getType();
            this.title = review.getTitle();
            this.content = review.getContent();
            this.view = review.getView();
            this.createdAt = review.getCreatedAt();
            this.modifiedAt = review.getModifiedAt();
            this.productId = review.getProduct().getId();
            this.productName = review.getProduct().getName();
        }

    }
}
