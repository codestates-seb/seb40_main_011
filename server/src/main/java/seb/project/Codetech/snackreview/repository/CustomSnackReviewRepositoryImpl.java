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

import seb.project.Codetech.redis.entity.ProductStat;
import seb.project.Codetech.snackreview.dto.SnackReviewRequestDto;
import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;

@Repository
@Transactional(readOnly = true)
public class CustomSnackReviewRepositoryImpl implements CustomSnackReviewRepository {

	private final JPAQueryFactory queryFactory;

	public CustomSnackReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<SnackReviewResponseDto.Card> searchSortedCardsByProductId(SnackReviewRequestDto.Get params) {

		return queryFactory
			.select(Projections.fields(SnackReviewResponseDto.Card.class,
				snackReview.id,
				snackReview.score,
				snackReview.content,
				snackReview.createdAt,
				user.id.as("writerId"),
				user.image,
				user.nickname)
			)
			.from(snackReview)
			.leftJoin(snackReview.writer, user)
			.where(snackReview.product.id.eq(params.getProductId()))
			.orderBy(buildOrderSpecifiers(params.isSortByGrade(), params.isAsc()))
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();
	}

	@Override
	public ProductStat searchInfoGroupByProductId(Long productId) {
		ProductStat productStat = queryFactory
			.select(Projections.fields(ProductStat.class,
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

		productStat.setId(productId);

		return productStat;
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

	public boolean hasNext(List<SnackReviewResponseDto.Card> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}
}
