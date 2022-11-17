package seb.project.Codetech.snackreview.repository;

import static seb.project.Codetech.snackreview.entity.QSnackReview.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.ArrayList;
import java.util.Collections;
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
	public SnackReviewResponseDto.Slice searchSortedSliceByProductId(SnackReviewServiceDto.Search cond) {
		List<SnackReviewResponseDto.Card> cards = queryFactory
			.select(Projections.fields(
				SnackReviewResponseDto.Card.class,
				snackReview.id,
				snackReview.score,
				snackReview.content,
				user.nickname,
				user.image)
			)
			.from(snackReview)
			.join(snackReview.user, user).fetchJoin()
			.where(snackReview.product.id.eq(cond.getProductId()))
			.orderBy(buildOrderSpecifiers(cond.getSort(), cond.getOrder()))
			.offset(cond.getOffset())
			.limit(cond.getLimit() + 1)
			.fetch();

		SnackReviewResponseDto.Slice slice = new SnackReviewResponseDto.Slice();
		slice.setHasNext(hasNext(cards, cond.getLimit()));
		slice.setCards(cards);

		return slice;
	}

	@Override
	public SnackReviewResponseDto.First searchFirstSliceByProductId(SnackReviewServiceDto.Search cond) {
		SnackReviewResponseDto.First firstSlice = queryFactory
			.select(Projections.fields(
				SnackReviewResponseDto.First.class,
				snackReview.id.count(),
				snackReview.score.costEfficiency.avg().as("avgCe"),
				snackReview.score.design.avg().as("avgDsn"),
				snackReview.score.quality.avg().as("avgQlt"),
				snackReview.score.performance.avg().as("avgPerf"),
				snackReview.score.satisfaction.avg().as("avgStf"))
			)
			.from(snackReview)
			.where(snackReview.product.id.eq(cond.getProductId()))
			.fetchFirst();

		firstSlice.setSlice(searchSortedSliceByProductId(cond));

		return firstSlice;
	}

	private boolean hasNext(List<SnackReviewResponseDto.Card> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}

	private OrderSpecifier<?>[] buildOrderSpecifiers(String sort, String order) {
		List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();
		orderSpecifiers.add(snackReview.id.desc());

		if (sort == null) {
			return orderSpecifiers.toArray(new OrderSpecifier[0]);
		}

		if (order.equals("ASC")) {
			orderSpecifiers.add(snackReview.grade.asc());
			Collections.reverse(orderSpecifiers);

			return orderSpecifiers.toArray(new OrderSpecifier[0]);
		}

		orderSpecifiers.add(snackReview.grade.desc());
		Collections.reverse(orderSpecifiers);

		return orderSpecifiers.toArray(new OrderSpecifier[0]);
	}
}
