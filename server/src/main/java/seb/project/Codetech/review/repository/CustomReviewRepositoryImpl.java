package seb.project.Codetech.review.repository;

import static seb.project.Codetech.product.entity.QProduct.*;
import static seb.project.Codetech.review.entity.QReview.*;
import static seb.project.Codetech.review.entity.QReviewComment.*;
import static seb.project.Codetech.user.entity.QUser.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.entity.Sort;

@Repository
public class CustomReviewRepositoryImpl implements CustomReviewRepository {
	private final JPAQueryFactory queryFactory;

	public CustomReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public ReviewResponseDto.Page getReviewPageByReview(Long id, Review loadReview) {
		// App-level join!

		// 코멘트 개수 업데이트
		loadReview.updateCommentCount(queryFactory);

		// 1. 대댓글이 아닌 댓글만 먼저 가져옴.
		var comments = queryFactory
			.select(
				Projections.fields(ReviewResponseDto.Comment.class,
					reviewComment.id,
					reviewComment.content,
					reviewComment.createdAt,
					user.id.as("userId"),
					user.nickname.as("writer"),
					user.image.as("userImage")
				)
			)
			.from(reviewComment)
			.where(reviewComment.review.id.eq(id).and(reviewComment.parent.id.isNull()))
			.orderBy(reviewComment.id.asc())
			.fetch();
		var commentMap = new HashMap<Long, ReviewResponseDto.Comment>();

		for (var comment : comments) {
			comment.setChild(new ArrayList<>());
			commentMap.put(comment.getId(), comment);
		}

		// 2. 위에서 가져온 댓글이 하나라도 있으면, 그 대댓글을 가져와서 넣어줌.
		if (!comments.isEmpty()) {
			var commentsChildren = queryFactory
				.select(
					Projections.fields(ReviewResponseDto.Comment.class,
						reviewComment.id,
						reviewComment.content,
						reviewComment.createdAt,
						user.id.as("userId"),
						user.nickname.as("writer"),
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
	public List<ReviewResponseDto.ReviewList> loadSortReviewByProductId(Long id, Sort sort, Long offset, int limit) {

		// 댓글 많은 순 -> 댓글이 몇 갠지 알아야 함
		// 세 가지 방법이 있음
		// 1. 그때그때 count로 개수를 셈: 비효율적임 (read가 너무 잦아짐)
		// 2. 댓글 하나 쓸 때마다 count를 1 올림: 이것도 비효율적임 (write가 많아짐)
		// 3. (댓글 개수가 부정확해도 괜찮은 경우) 댓글을 쓸 때, 마지막으로 댓글 개수를 업데이트한 시점으로부터 일정 시간이 지났을 때만 개수 업데이트
		// 지금은 3번을 써볼게요 (레디스 없이)

		// 하는 절차
		// 1. 칼럼을 두 개 추가한다: 댓글 개수, 마지막으로 댓글 개수가 업데이트된 시간
		// 2. 댓글이 추가될 때, 댓글 개수가 업데이트된 시간을 가져와서, 일정 시간이 지났으면 댓글 개수 업데이트
		// 3. profit!

		// 1. 입력한 제품 아이디에 연관된 모든 리뷰를 조회한다

		var reviewListQuery = queryFactory
			.select(Projections.fields(ReviewResponseDto.ReviewList.class,
					review.id,
					review.title,
					review.content,
					review.writer,
					review.RecommendNumber,
					review.createdAt,
					review.commentCount,
					review.commentUpdatedAt,
					user.image.as("userImage")
				)
			)
			.from(review)
			.where(review.product.id.eq(id))
			.leftJoin(review.user, user).offset(offset)
			.limit(limit + 1);

		if (sort.equals(Sort.RECENT)) // 최신 순 정렬
			reviewListQuery.orderBy(review.createdAt.desc()); // 또는 review.modifiedAt.desc()

		if (sort.equals(Sort.MOST_LIKE)) {
			reviewListQuery.orderBy(review.RecommendNumber.desc()); // 좋아요 많은 순 정렬
			reviewListQuery.orderBy(review.createdAt.desc()); // 만약에 같으면 최신 순으로 정렬한다.
		}

		if (sort.equals(Sort.TOP_COMMENT)) {
			reviewListQuery.orderBy(review.commentCount.desc()); // 댓글 많은 순 정렬
			reviewListQuery.orderBy(review.createdAt.desc()); // 만약에 같으면 최신 순으로 정렬한다.
		}

		return reviewListQuery.fetch();
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

	public boolean hasNext(List<ReviewResponseDto.ReviewList> reviewLists, int limit) {
		if (reviewLists.size() > limit) {
			reviewLists.remove(limit);
			return true;
		}

		return false;
	}
}
