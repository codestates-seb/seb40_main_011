package seb.project.Codetech.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import seb.project.Codetech.review.dto.ReviewCommRequestDto;
import seb.project.Codetech.review.entity.ReviewComment;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewCommMapper {

	ReviewComment reviewCommPostRequestDtoToReviewComment(ReviewCommRequestDto.Post request);

	ReviewComment reviewCommPatchRequestDtoToReviewComment(ReviewCommRequestDto.Patch request);
}
