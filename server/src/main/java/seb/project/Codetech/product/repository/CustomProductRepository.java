package seb.project.Codetech.product.repository;

import java.util.List;
import java.util.Map;

import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Type;

public interface CustomProductRepository {
	List<ProductResponseDto.Select> findByProductType(Type type);

	ProductResponseDto.Get getSearchProductById(Long product);

	List<ProductResponseDto.Card> searchMainPage();

	Map<Long, String> searchFileSByProductIds(List<Long> productIds);

	List<ProductResponseDto.Search> searchProductByKeyword(String keyword, Long offset, Integer limit);

	boolean hasNext(List<?> responseList, Integer limit);
}
