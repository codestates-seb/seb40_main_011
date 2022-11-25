package seb.project.Codetech.review.repository;

import static seb.project.Codetech.product.entity.QProduct.*;
import static seb.project.Codetech.review.entity.QReview.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.List;

import javax.persistence.EntityManager;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;

public class CustomReviewRepositoryImpl implements CustomReviewRepository {
	private final JPAQueryFactory queryFactory;

	public CustomReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<ReviewResponseDto.Post> findByReviewResponseDto(Review findReview) {

		return queryFactory
			.select(
				Projections.bean(ReviewResponseDto.Post.class,
					review.id, review.title, review.content, review.writer, review.view, review.type,
					user.id.as("userId"), user.nickname.as("userNickname"), user.image.as("userImage"),
					product.name.as("productName"), product.detail.as("productDetail")
				))
			.from(review)
			.where(review.id.eq(findReview.getId()))
			.leftJoin(review.user, user).on(user.eq(findReview.getUser()))
			.leftJoin(review.product, product).on(product.eq(findReview.getProduct()))
			.fetch();

	}
}
