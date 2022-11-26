package seb.project.Codetech.product.repository;

import static seb.project.Codetech.file.entity.QFileEntity.*;
import static seb.project.Codetech.product.entity.QProduct.*;

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
}
