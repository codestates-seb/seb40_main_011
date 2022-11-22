package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.review.entity.Review;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserAndReviewsDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
    private List<MyReviewCard> reviews;


    @Getter
    @NoArgsConstructor
    public static class MyReviewCard{
        private Long id;
        private Type type;
        private String title;
        private String content;
        private Long view;

//        private Long productId;
//        private String productName;

        public MyReviewCard(Review review){
            this.id = review.getId();
            this.type = review.getType();
            this.title = review.getTitle();
            this.content = review.getContent();
            this.view = review.getView();
//            this.productId = review.getProduct().getId();
//            this.productName = review.getProduct().getName();
        }

    }
}
