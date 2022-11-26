package seb.project.Codetech.product.repository;

import java.util.List;

import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Type;

public interface CustomProductRepository {
	List<ProductResponseDto.Select> findByProductType(Type type);
	List<ProductResponseDto.Category> findByProductTypes(Type type);
}
