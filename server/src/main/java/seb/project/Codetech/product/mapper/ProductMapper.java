package seb.project.Codetech.product.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import seb.project.Codetech.product.dto.ProductDto;
import seb.project.Codetech.product.entity.Product;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
	Product productPostDtoToProduct(ProductDto.Post postDto);

	Product productPatchDtoToProduct(Long id, ProductDto.Patch patch);
}
