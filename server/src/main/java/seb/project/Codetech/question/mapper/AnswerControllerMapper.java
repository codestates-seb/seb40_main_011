package seb.project.Codetech.question.mapper;

import org.springframework.stereotype.Component;

import seb.project.Codetech.question.dto.AnswerRequestDto;
import seb.project.Codetech.question.dto.AnswerServiceDto;

@Component
public class AnswerControllerMapper {
	public AnswerServiceDto.Create requestToCreateDto(String email, AnswerRequestDto.Post request) {
		return new AnswerServiceDto.Create(
			email,
			request.getQuestionId(),
			request.getContent()
		);
	}
}
