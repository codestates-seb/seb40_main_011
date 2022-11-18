package seb.project.Codetech.snackreview.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.product.service.ProductService;
import seb.project.Codetech.snackreview.dto.SnackReviewControllerDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.user.service.UserService;

@Component
@RequiredArgsConstructor
public class SnackReviewServiceMapper {
	private final UserService userService;
	private final ProductService productService;

	public SnackReview createDtoToEntity(SnackReviewServiceDto.Create dto) {
		SnackReview snackReview = SnackReview.builder()
			.content(dto.getContent())
			.type(dto.getType())
			.build();
		snackReview.setScore(dto.getScore());
		snackReview.setUser(userService.findUser(dto.getLoginEmail()));
		snackReview.setProduct(productService.findProduct(dto.getProductId()));

		return snackReview;
	}

	public SnackReviewServiceDto.Search getParamsToSearchCond(SnackReviewControllerDto.Get params) {
		return SnackReviewServiceDto.Search.builder()
			.productId(params.getProductId())
			.offset(params.getFirstSize() + params.getCount() * params.getSize())
			.limit(params.getSize())
			.sort(params.getSort())
			.asc(params.getAsc())
			.build();
	}
}
