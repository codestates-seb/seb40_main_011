package seb.project.Codetech.snackreview.mapper;

import org.springframework.stereotype.Component;

import seb.project.Codetech.snackreview.dto.SnackReviewRequestDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;

@Component
public class SnackReviewControllerMapper {
	public SnackReviewServiceDto.Create postDtoToCreateDto(String email, SnackReviewRequestDto.Post dto) {
		return SnackReviewServiceDto.Create.builder()
			.score(dto.getScore())
			.content(dto.getContent())
			.loginEmail(email)
			.productId(dto.getProductId())
			.build();
	}

	public SnackReviewServiceDto.Update patchDtoToUpdateDto(Long id, SnackReviewRequestDto.Patch dto) {
		return SnackReviewServiceDto.Update.builder()
			.id(id)
			.score(dto.getScore())
			.content(dto.getContent())
			.build();
	}
}
