package seb.project.Codetech.snackreview.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.snackreview.entity.SnackReview;

@Getter
@NoArgsConstructor
public class SnackReviewUpdateDto {
	private Long id;
	private SnackReview.Score score;
	private String content;
}
