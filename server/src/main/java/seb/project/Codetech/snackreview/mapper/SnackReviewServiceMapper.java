package seb.project.Codetech.snackreview.mapper;

import org.springframework.stereotype.Component;

import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;

@Component
public class SnackReviewServiceMapper {
	public SnackReview createDtoToEntity(SnackReviewServiceDto.Create dto) {
		SnackReview snackReview = SnackReview.builder()
			.content(dto.getContent())
			.type(dto.getType())
			.build();
		snackReview.setScore(dto.getScore());
		snackReview.setUser(dto.getUser());
		snackReview.setProduct(dto.getProduct());

		return snackReview;
	}
}
