package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.ReviewScore;
import seb.project.Codetech.snackreview.entity.SnackReview;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserAndSnackReviewsDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
    private List<MyPageCard> snackReviews;


    @Getter
    @NoArgsConstructor
    public static class MyPageCard {
        private Long id;

        public MyPageCard(SnackReview snackReview) {
            this.id = snackReview.getId();
            this.score = snackReview.getScore();
            this.content = snackReview.getContent();
            this.type = snackReview.getType();
            this.createdAt = snackReview.getCreatedAt();
            this.modifiedAt = snackReview.getModifiedAt();
            this.productId = snackReview.getProduct().getId();
            this.productName = snackReview.getProduct().getName();
        }

        private ReviewScore score;
        private String content;
        private Type type;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        private Long productId;
        private String productName;
    }
}
