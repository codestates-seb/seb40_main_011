package seb.project.Codetech.product.repository;

import static seb.project.Codetech.product.entity.QProduct.*;

import java.util.List;

import javax.persistence.EntityManager;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Type;

public class ProductRepositoryImpl implements ProductRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public ProductRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<ProductResponseDto.selectProduct> searchTypePrduct(String type) {
		return queryFactory
			.select(Projections.fields(ProductResponseDto.selectProduct.class,
				product.name)
			)
			.from(product)
			.where(product.type.eq(Type.valueOf(type)))
			.fetch();
	}
}
