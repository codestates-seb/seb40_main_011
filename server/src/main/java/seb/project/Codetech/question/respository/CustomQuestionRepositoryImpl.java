package seb.project.Codetech.question.respository;

import static seb.project.Codetech.question.entity.QAnswer.*;
import static seb.project.Codetech.question.entity.QQuestion.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.question.dto.QuestionRequestDto;
import seb.project.Codetech.question.dto.QuestionResponseDto;

@Repository
@Transactional(readOnly = true)
public class CustomQuestionRepositoryImpl implements CustomQuestionRepository {
	private final JPAQueryFactory queryFactory;

	public CustomQuestionRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<QuestionResponseDto.Card> searchSortedCardsByAdoption(QuestionRequestDto.Get params) {
		return queryFactory
			.select(Projections.bean(QuestionResponseDto.Card.class,
				question.id,
				question.content,
				user.nickname,
				question.adoptedId,
				question.deleted,
				question.createdAt,
				question.modifiedAt)
			)
			.from(question)
			.join(question.writer, user)
			.where(checkAdoption(params.isAdoption()),
				ltOrGtQuestionId(params.getLastId(), params.isAsc()))
			.orderBy(buildOrderSpecifier(params.isAsc()))
			.limit(params.getSize() + 1)
			.fetch();
	}

	@Override
	public Map<Long, List<QuestionResponseDto.AnswerCard>> searchAnswerCardsByQuestionIds(List<Long> questionIds) {
		List<QuestionResponseDto.AnswerCard> answerCards = queryFactory
			.select(Projections.fields(QuestionResponseDto.AnswerCard.class,
				answer.id,
				answer.question.id.as("questionId"),
				answer.content,
				user.nickname,
				answer.createdAt,
				answer.modifiedAt
			))
			.from(answer)
			.join(answer.writer, user)
			.where(answer.question.id.in(questionIds))
			.fetch();

		return answerCards.stream()
			.collect(Collectors.groupingBy(QuestionResponseDto.AnswerCard::getQuestionId));
	}

	@Override
	public boolean hasNext(List<QuestionResponseDto.Card> cards, int size) {
		if (cards.size() > size) {
			cards.remove(size);
			return true;
		}

		return false;
	}

	private BooleanExpression checkAdoption(boolean adoption) {
		if (adoption == false) {
			return question.adoptedId.isNull();
		}
		return question.adoptedId.isNotNull();
	}

	private BooleanExpression ltOrGtQuestionId(Long lastId, boolean asc) {
		if (lastId == null) {
			return null;
		}

		if (asc == true) {
			return question.id.gt(lastId);
		}

		return question.id.lt(lastId);
	}

	private OrderSpecifier<Long> buildOrderSpecifier(boolean asc) {
		if (asc == true) {
			return question.id.asc();
		}
		return question.id.desc();
	}
}
