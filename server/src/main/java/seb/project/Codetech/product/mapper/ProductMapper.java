package seb.project.Codetech.product.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import seb.project.Codetech.product.dto.ProductDto;
import seb.project.Codetech.product.entity.Product;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
	Product productPostDtoToProduct(ProductDto.Post postDto);
	Product productGetDtoToProduct(ProductDto.Get getDto);

	Product productPatchDtoToProduct(ProductDto.Patch patchDto);

	List<ProductDto.Response> productsToproductResponse(List<Product> products);
}
