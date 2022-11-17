package seb.project.Codetech.snackreview.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.product.service.ProductService;
import seb.project.Codetech.snackreview.dto.SnackReviewControllerDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;
import seb.project.Codetech.user.service.UserService;

@Component
@RequiredArgsConstructor
public class SnackReviewControllerMapper {
	private final UserService userService;
	private final ProductService productService;

	public SnackReviewServiceDto.Create postDtoToCreateDto(String email, SnackReviewControllerDto.Post dto) {
		return SnackReviewServiceDto.Create.builder()
			.score(dto.getScore())
			.content(dto.getContent())
			.type(dto.getType())
			.user(userService.findUser(email))
			.product(productService.findProductId(dto.getProductId()))
			.build();
	}

	public SnackReviewServiceDto.Update patchDtoToUpdateDto(Long id, SnackReviewControllerDto.Patch dto) {
		return SnackReviewServiceDto.Update.builder()
			.id(id)
			.score(dto.getScore())
			.content(dto.getContent())
			.build();
	}
}
