package seb.project.Codetech.product.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import seb.project.Codetech.product.dto.ProductDto;
import seb.project.Codetech.product.dto.ProductListResponse;
import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Product;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
	Product productPostDtoToProduct(ProductDto.Post postDto);

	Product productPatchDtoToProduct(Long id, ProductDto.Patch patch);

	ProductResponseDto.Post productToProductPostResponse(Product product);

	ProductResponseDto.Patch productToProductPatchResponse(Product product);

	List<ProductListResponse> productsDtoToProductResponse(List<Product> products);

}
