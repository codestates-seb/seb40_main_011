package seb.project.Codetech.product.repository;

import static seb.project.Codetech.product.entity.QProduct.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
	public List<ProductResponseDto.selectProduct> findByProductType(Type type) {
		return queryFactory
			.select(Projections.fields(ProductResponseDto.selectProduct.class,
				product.name)
			)
			.from(product)
			.where(product.type.eq(type))
			.fetch();
	}
}
