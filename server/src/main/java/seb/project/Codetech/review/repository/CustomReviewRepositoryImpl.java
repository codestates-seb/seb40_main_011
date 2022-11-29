package seb.project.Codetech.review.repository;

import static seb.project.Codetech.product.entity.QProduct.*;
import static seb.project.Codetech.review.entity.QReview.*;
import static seb.project.Codetech.review.entity.QReviewComment.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.review.dto.ReviewRequestDto;
import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;

@Repository
public class CustomReviewRepositoryImpl implements CustomReviewRepository {
	private final JPAQueryFactory queryFactory;

	public CustomReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public ReviewResponseDto.Page getReviewPageByReview(Long id, Review loadReview) {
		// App-level join!

		// 1. 대댓글이 아닌 댓글만 먼저 가져옴.
		var comments = queryFactory
			.select(
				Projections.fields(ReviewResponseDto.Comment.class,
					reviewComment.id,
					reviewComment.content,
					user.id.as("userId"),
					user.image.as("userImage")
				)
			)
			.from(reviewComment)
			.where(reviewComment.review.id.eq(id).and(reviewComment.parent.id.isNull()))
			.orderBy(reviewComment.id.asc())
			.fetch();
		var commentMap = new HashMap<Long, ReviewResponseDto.Comment>();

		for (var comment : comments) {
			//comment.setChild(new ArrayList<>());
			commentMap.put(comment.getId(), comment);
		}

		// 2. 위에서 가져온 댓글이 하나라도 있으면, 그 대댓글을 가져와서 넣어줌.
		if (!comments.isEmpty()) {
			var commentsChildren = queryFactory
				.select(
					Projections.fields(ReviewResponseDto.Comment.class,
						reviewComment.id,
						reviewComment.content,
						user.id.as("userId"),
						user.image.as("userImage"),
						Projections.fields(ReviewResponseDto.Comment.class,
							reviewComment.parent.id.as("id")
						).as("parent")
					)
				)
				.from(reviewComment)
				.where(reviewComment.parent.id.in(
					comments.stream().map(ReviewResponseDto.Comment::getId).collect(Collectors.toList())))
				.orderBy(reviewComment.id.asc())
				.fetch();

			for (var commentChild : commentsChildren) {
				var parentId = commentChild.getParent().getId();
				commentMap.get(parentId).getChild().add(commentChild);
			}
		}

		// 3. 목표한 리뷰 글 하나를 가져옴.
		var page = queryFactory
			.select(
				Projections.fields(ReviewResponseDto.Page.class,
					review.title,
					review.content,
					review.type,
					review.view,
					review.RecommendNumber,
					review.writer,
					review.createdAt,
					user.id.as("userId"),
					user.image.as("userImage"),
					product.name.as("productName"),
					product.detail.as("productDetail")
				)
			)
			.from(review)
			.where(review.id.eq(id))
			.leftJoin(review.user, user)
			.leftJoin(review.product, product)
			.fetchOne();

		assert page != null; // 가져온 page가 null이 아님을 확인.
		// 4. 위에서 가져온 댓글을 리뷰 글 DTO에 쑤셔넣음.
		page.setReviewComments(comments);

		// 5. 리턴
		return page;
	}

	@Override
	public List<ReviewResponseDto.ReviewList> loadSortReviewByProductId(ReviewRequestDto.Get get) {

		// 1. 입력한 제품 아이디에 연관된 모든 리뷰를 조회한다
		var reviewList = queryFactory
			.select(Projections.fields(ReviewResponseDto.ReviewList.class,
					review.id,
					review.title,
					review.content,
					review.writer,
					review.RecommendNumber,
					review.createdAt,
					user.image.as("userImage")
				)
			)
			.from(review)
			.where(review.product.id.eq(get.getProductId()))
			.leftJoin(review.user, user)
			.orderBy(checkSortBySlice(get.getSort()))
			.offset(get.getOffset())
			.limit(get.getLimit() + 1)
			.fetch();

		// 2. 각 리뷰글에 생성된 댓글의 수를 카운트해서 리스트 값에 넣는다.
		for (ReviewResponseDto.ReviewList review : reviewList) {

			var reviewCount = queryFactory
				.select(reviewComment.review.id.count())
				.from(reviewComment)
				.where(reviewComment.review.id.eq(review.getId()))
				.fetchOne();

			review.setReviewCommCount(reviewCount);
		}

		// 3. 연산값을 반환한다.
		return reviewList;
	}

	@Override
	public List<ReviewResponseDto.Search> searchReviewByKeyword(String keyword) {
		return queryFactory
			.select(Projections.fields(ReviewResponseDto.Search.class,
					review.title,
					review.content,
					review.writer,
					review.RecommendNumber,
					user.image.as("userImage")
				)
			)
			.from(review)
			.where(
				review.title.contains(keyword).or(review.content.contains(keyword)))
			.leftJoin(review.user, user)
			.orderBy(review.id.desc())
			.fetch();
	}

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
		return queryFactory.select(
				Projections.fields(ReviewResponseDto.Best.class,
					review.id,
					review.title,
					review.content,
					review.RecommendNumber,
					review.type,
					review.writer,
					review.createdAt,
					user.image))
			.from(review)
			.leftJoin(review.user, user)
			.orderBy(review.RecommendNumber.desc())
			.offset(0)
			.limit(size)
			.fetch();
	}

	private OrderSpecifier<?>[] checkSortBySlice(int sort) {
		Deque<OrderSpecifier<?>> orderSpecifiers = new ArrayDeque<>();
		orderSpecifiers.add(review.id.desc());

		if (sort == 1) { // 정렬 기준이 리뷰의 좋아요가 많은 순
			orderSpecifiers.addFirst(review.RecommendNumber.desc());
			return orderSpecifiers.toArray(new OrderSpecifier[0]);
		}

		if (sort == 2) { // 정렬 기준이 리뷰의 댓글이 많은 순 ->
			orderSpecifiers.addFirst(review.view.desc());
			return orderSpecifiers.toArray(new OrderSpecifier[0]);
		}

		// 기본 정렬은 리뷰의 최신 순
		orderSpecifiers.addFirst(review.id.desc());
		return orderSpecifiers.toArray(new OrderSpecifier[0]);
	}

	public boolean hasNext(List<ReviewResponseDto.ReviewList> lists, int limit) {
		if (lists.size() > limit) {
			lists.remove(limit);
			return true;
		}

		return false;
	}
}
