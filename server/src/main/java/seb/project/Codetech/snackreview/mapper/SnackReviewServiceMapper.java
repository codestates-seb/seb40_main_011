package seb.project.Codetech.snackreview.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.product.service.ProductService;
import seb.project.Codetech.snackreview.dto.SnackReviewRequestDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.user.service.UserService;

@Component
@RequiredArgsConstructor
public class SnackReviewServiceMapper {
	private final UserService userService;
	private final ProductService productService;

	public SnackReview createDtoToEntity(SnackReviewServiceDto.Create dto) {
		SnackReview snackReview = new SnackReview(dto.getContent());
		snackReview.setScore(dto.getScore());
		snackReview.setWriter(userService.findUser(dto.getLoginEmail()));
		snackReview.setSubject(productService.findProductId(dto.getProductId()));

		return snackReview;
	}

	public SnackReviewServiceDto.Search getParamsToSearchCond(SnackReviewRequestDto.Get params) {
		return SnackReviewServiceDto.Search.builder()
			.productId(params.getProductId())
			.offset(params.getOffset())
			.limit(params.getLimit())
			.sortByGrade(params.isSortByGrade())
			.asc(params.isAsc())
			.build();
	}
}
