package seb.project.Codetech.snackreview.repository;

import static seb.project.Codetech.snackreview.entity.QSnackReview.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;

@Repository
@Transactional(readOnly = true)
public class CustomSnackReviewRepositoryImpl implements CustomSnackReviewRepository {

	private final JPAQueryFactory queryFactory;

	public CustomSnackReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<SnackReviewResponseDto.Card> searchSortedCardsByProductId(SnackReviewServiceDto.Search cond) {

		return queryFactory
			.select(Projections.fields(
				SnackReviewResponseDto.Card.class,
				snackReview.id,
				snackReview.score,
				snackReview.content,
				user.nickname,
				user.image)
			)
			.from(snackReview)
			.leftJoin(snackReview.writer, user)
			.where(snackReview.product.id.eq(cond.getProductId()))
			.orderBy(buildOrderSpecifiers(cond.isSortByGrade(), cond.isAsc()))
			.offset(cond.getOffset())
			.limit(cond.getLimit() + 1)
			.fetch();
	}

	@Override
	public SnackReviewResponseDto.Info searchInfoGroupByProductId(Long productId) {

		return queryFactory
			.select(Projections.fields(
				SnackReviewResponseDto.Info.class,
				snackReview.count().as("total"),
				snackReview.score.costEfficiency.avg().as("avgCe"),
				snackReview.score.design.avg().as("avgDsn"),
				snackReview.score.quality.avg().as("avgQlt"),
				snackReview.score.performance.avg().as("avgPerf"),
				snackReview.score.satisfaction.avg().as("avgStf"))
			)
			.from(snackReview)
			.where(snackReview.product.id.eq(productId))
			.fetchFirst();
	}

	private OrderSpecifier<?>[] buildOrderSpecifiers(boolean sortByGrade, boolean asc) {
		Deque<OrderSpecifier<?>> orderSpecifiers = new ArrayDeque<>();
		orderSpecifiers.add(snackReview.id.desc());

		if (sortByGrade == false) {
			return orderSpecifiers.toArray(new OrderSpecifier[0]);
		}

		if (asc == true) {
			orderSpecifiers.addFirst(snackReview.grade.asc());

			return orderSpecifiers.toArray(new OrderSpecifier[0]);
		}

		orderSpecifiers.addFirst(snackReview.grade.desc());

		return orderSpecifiers.toArray(new OrderSpecifier[0]);
	}
}
