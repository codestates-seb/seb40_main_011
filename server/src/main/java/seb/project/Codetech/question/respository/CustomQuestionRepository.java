package seb.project.Codetech.question.respository;

import java.util.List;
import java.util.Map;

import seb.project.Codetech.question.dto.QuestionRequestDto;
import seb.project.Codetech.question.dto.QuestionResponseDto;

public interface CustomQuestionRepository {
	List<QuestionResponseDto.Card> searchSortedCardsByAdoption(QuestionRequestDto.Get params);

	Map<Long, List<QuestionResponseDto.AnswerCard>> searchAnswerCardsByQuestionIds(List<Long> questionIds);

	boolean hasNext(List<QuestionResponseDto.Card> cards, int size);
}
