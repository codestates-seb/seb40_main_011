package seb.project.Codetech.question.service;

import static seb.project.Codetech.global.exception.ExceptionCode.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.question.dto.QuestionRequestDto;
import seb.project.Codetech.question.dto.QuestionResponseDto;
import seb.project.Codetech.question.entity.Question;
import seb.project.Codetech.question.respository.QuestionRepository;
import seb.project.Codetech.user.service.UserService;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {
	private final QuestionRepository questionRepository;
	private final UserService userService;

	@Transactional(readOnly = true)
	public QuestionResponseDto.Slice readQuestion(QuestionRequestDto.Get params) {
		List<QuestionResponseDto.Card> cards = questionRepository.searchSortedCardsByAdoption(params);
		boolean hasNext = questionRepository.hasNext(cards, params.getSize());

		List<Long> questionIds = toQuestionIds(cards);

		Map<Long, List<QuestionResponseDto.AnswerCard>> answerCardMap =
			questionRepository.searchAnswerCardsByQuestionIds(questionIds);

		cards.forEach(c ->
			c.setAnswerCards(answerCardMap.get(c.getId())));

		return new QuestionResponseDto.Slice(hasNext, cards);
	}

	public Long createQuestion(String email, String content) {
		Question question = Question.from(content);
		question.setWriter(userService.findUser(email));
		question.getWriter().updatePoint(10);

		return questionRepository.save(question).getId();
	}

	public Long updateQuestion(Long id, String content) {
		Question question = findVerifiedOne(id);
		question.checkUpdatable();

		question.updateContent(content);

		return question.getId();
	}

	public void deleteQuestion(Long id) {
		Question question = findVerifiedOne(id);
		if (question.isDeletable()) {
			questionRepository.delete(question);
			return;
		}

		question.updateToDeleted();
	}

	public Long adoptAnswer(Long id, Long answerId) {
		Question question = findVerifiedOne(id);
		question.checkAdoptable();
		question.adopt(answerId);

		return question.getAdoptedId();
	}

	@Transactional(readOnly = true)
	public Question findVerifiedOne(Long id) {
		Optional<Question> found = questionRepository.findById(id);

		return found.orElseThrow(
			() -> new BusinessLogicException(QUESTION_NOT_FOUND)
		);
	}

	private List<Long> toQuestionIds(List<QuestionResponseDto.Card> cards) {
		return cards.stream()
			.map(QuestionResponseDto.Card::getId)
			.collect(Collectors.toList());
	}
}
