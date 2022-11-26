package seb.project.Codetech.product.repository;

import static seb.project.Codetech.file.entity.QFileEntity.*;
import static seb.project.Codetech.product.entity.QProduct.*;
import static seb.project.Codetech.review.entity.QReview.*;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberPath;
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
				product.name)
			)
			.from(product)
			.where(product.type.eq(type))
			.fetch();
	}

	@Override
	public List<ProductResponseDto.Category> findByProductTypes(Type type) {

		List<ProductResponseDto.Category> categories = queryFactory
			.select(Projections.fields(
					ProductResponseDto.Category.class,
					product.id,
					product.name,
					product.type,
					fileEntity.uuidName.as("fileName"),
					fileEntity.path.as("filePath")
				)
			)
			.from(product)
			.where(product.type.eq(type))
			.leftJoin(product.fileEntities, fileEntity)
			.fetch();

		List<NumberPath<Long>> productId =
			categories.stream().map(c -> product.id).collect(Collectors.toList());

		ProductResponseDto.Category reviewCount = queryFactory
			.select(Projections.fields(
				ProductResponseDto.Category.class,
				product,
				review.count().as("reviewCount"))
			)
			.from(product)
			.leftJoin(product.reviews, review)
			.where(review.product.id.eq(product.id))
			.fetchOne();

		categories.add(reviewCount);

		return categories;
	}
}
