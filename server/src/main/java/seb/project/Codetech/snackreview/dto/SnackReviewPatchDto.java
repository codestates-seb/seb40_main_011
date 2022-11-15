package seb.project.Codetech.snackreview.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.snackreview.entity.SnackReview;

@Getter
@NoArgsConstructor
public class SnackReviewPatchDto {
	@NotNull
	private SnackReview.Score score;

	@NotBlank
	private String content;
}
