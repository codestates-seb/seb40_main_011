package seb.project.Codetech.product.repository;

import static seb.project.Codetech.file.entity.QFileEntity.*;
import static seb.project.Codetech.product.entity.QProduct.*;
import static seb.project.Codetech.review.entity.QReview.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Type;

@Repository
@Transactional(readOnly = true)
public class CustomProductRepositoryImpl implements CustomProductRepository {

	private final JPAQueryFactory queryFactory;

	public CustomProductRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<ProductResponseDto.Select> findByProductType(Type type) {
		return queryFactory
			.select(Projections.fields(ProductResponseDto.Select.class,
				product.id,
				product.name
			))
			.from(product)
			.where(product.type.eq(type))
			.fetch();
	}

	@Override
	public ProductResponseDto.Get getSearchProductById(Long productId) {
		return queryFactory
			.select(Projections.fields(ProductResponseDto.Get.class,
				product.name,
				product.detail,
				product.type,
				product.writer,
				product.modifier,
				product.createdAt,
				fileEntity.as("fileEntities")
			))
			.from(product)
			.where(product.id.eq(productId))
			.leftJoin(product.fileEntities, fileEntity)
			.fetchOne();
	}

	@Override
	public List<ProductResponseDto.Card> searchMainPage() {

		return queryFactory
			.select(Projections.bean(ProductResponseDto.Card.class,
				product.id,
				product.name,
				product.type,
				product.createdAt
			))
			.from(product)
			.fetch();
	}

	@Override
	public Map<Long, String> searchFileSByProductIds(List<Long> productIds) {
		List<Tuple> paths = queryFactory
			.select(
				product.id,
				fileEntity.path
			)
			.from(fileEntity)
			.join(fileEntity.product, product)
			.where(fileEntity.product.id.in(productIds))
			.fetch();

		Map<Long, String> fileMap = new HashMap<>();

		paths.forEach(
			p -> fileMap.put(p.get(product.id), p.get(fileEntity.path))
		);

		return fileMap;
	}

	@Override
	public List<ProductResponseDto.Search> searchProductByKeyword(String keyword, Long offset, int limit) {

		// 1. 입력한 키워드를 기준으로 제품의 목록을 조회한다.
		List<ProductResponseDto.Search> productSearchs = queryFactory
			.select(Projections.fields(
					ProductResponseDto.Search.class,
					product.id,
					product.name,
					product.type
				)
			)
			.from(product)
			.where(product.name.contains(keyword) // Search: 제품의 이름이나 디테일에서 관련 키워드를 조회한다.
				.or(product.detail.contains(keyword)))
			.orderBy(product.createdAt.desc())
			.offset(offset)
			.limit(limit)
			.fetch();

		// 2. 조회된 제품의 목록이 가지고 있는 리뷰의 갯수를 조회해서 값을 넣는다.
		for (ProductResponseDto.Search product : productSearchs) {

			Long reviewCount = queryFactory
				.select(review.count())
				.from(review)
				.where(review.product.id.eq(product.getId()))
				.fetchOne();

			product.setReviewCount(reviewCount);
		}

		// 3. 연산된 쿼리를 반환한다.
		return productSearchs;
	}

	public boolean hasNext(List<?> responseList, int limit) {
		if (responseList.size() > limit) {
			responseList.remove(limit);
			return true;
		}

		return false;
	}
}
