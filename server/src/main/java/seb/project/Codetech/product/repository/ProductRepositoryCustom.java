package seb.project.Codetech.product.repository;

import java.util.List;

import seb.project.Codetech.product.dto.ProductResponseDto;

public interface ProductRepositoryCustom {

	List<ProductResponseDto.selectProduct> searchTypePrduct(String type);

}
