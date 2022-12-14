package seb.project.Codetech.snackreview.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.product.service.ProductService;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.user.service.UserService;

@Component
@RequiredArgsConstructor
public class SnackReviewServiceMapper {
	private final UserService userService;
	private final ProductService productService;

	public SnackReview createDtoToEntity(SnackReviewServiceDto.Create dto) {
		SnackReview snackReview = SnackReview.from(dto.getContent());
		snackReview.setScore(dto.getScore());
		snackReview.setWriter(userService.findUser(dto.getLoginEmail()));
		snackReview.setSubject(productService.findProductId(dto.getProductId()));

		return snackReview;
	}
}
