package seb.project.Codetech.snackreview.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.snackreview.validation.annotation.ValidScore;

@Getter
@NoArgsConstructor
public class SnackReviewPostDto {
	private SnackReview.@ValidScore Score score;

	@NotNull
	private Type type;

	@NotBlank
	private String content;

	@Positive
	private Long productId;
}
