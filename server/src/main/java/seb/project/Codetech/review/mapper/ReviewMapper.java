package seb.project.Codetech.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import seb.project.Codetech.review.dto.ReviewRequestDto;
import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
	Review reviewRequestDtoToPostReview(ReviewRequestDto.Post request);

	Review reviewRequestDtoToPatchReview(Long id, ReviewRequestDto.Patch request);

	ReviewResponseDto.Post reviewPostResponseDtoToPost(Review review);
}
