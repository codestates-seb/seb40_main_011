package seb.project.Codetech.review.repository;

import static seb.project.Codetech.review.entity.QReview.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.review.dto.ReviewResponseDto;

@Repository
public class CustomReviewRepositoryImpl implements CustomReviewRepository {
	private final JPAQueryFactory queryFactory;

	public CustomReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	// @Override
	// public Slice<ReviewResponseDto.Page> searchProductPageReviewsBySlice(Review findReview) {
	//
	// 	queryFactory
	// 		.select(
	// 			Projections.bean(ReviewResponseDto.Page.class,
	// 				review.id, review.title, review.content, review.writer, review.view, review.type,
	// 				user.id.as("userId"), user.nickname.as("userNickname"), user.image.as("userImage"),
	// 				product.name.as("productName"), product.detail.as("productDetail")
	// 			))
	// 		.from(review)
	// 		.where(review.id.eq(findReview.getId()))
	// 		.leftJoin(review.user, user).on(user.eq(findReview.getUser()))
	// 		.leftJoin(review.product, product).on(product.eq(findReview.getProduct()))
	// 		.fetch();
	//
	// }

	@Override
	public long getReviewCountByProductId(Long productId) {

		return queryFactory
			.select(review.count())
			.from(review)
			.where(review.product.id.eq(productId))
			.fetchFirst();
	}

	@Override
	public List<ReviewResponseDto.Best> getBestReviewContent(Integer size) {
		return queryFactory
			.select(Projections.fields(ReviewResponseDto.Best.class,
				review.title,
				review.content,
				review.type,
				review.writer,
				review.createdAt,
				user.image)
			)
			.from(review)
			.leftJoin(review.user, user)
			.orderBy(review.RecommendNumber.desc())
			.offset(0)
			.limit(size)
			.fetch();
	}
}
