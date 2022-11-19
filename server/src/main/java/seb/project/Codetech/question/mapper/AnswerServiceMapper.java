package seb.project.Codetech.question.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.question.dto.AnswerServiceDto;
import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.service.QuestionService;
import seb.project.Codetech.user.service.UserService;

@Component
@RequiredArgsConstructor
public class AnswerServiceMapper {
	private final UserService userService;
	private final QuestionService questionService;

	public Answer createdDtoToEntity(AnswerServiceDto.Create dto) {
		Answer answer = Answer.from(dto.getContent());
		answer.setWriter(userService.findUser(dto.getEmail()));
		answer.setQuestion(questionService.findVerifiedOne(dto.getQuestionId()));

		return answer;
	}
}
