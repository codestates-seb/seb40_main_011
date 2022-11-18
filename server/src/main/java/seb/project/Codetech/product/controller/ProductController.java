package seb.project.Codetech.product.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.global.page.PageInfo;
import seb.project.Codetech.global.page.PageListDto;
import seb.project.Codetech.product.dto.ProductDto;
import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.mapper.ProductMapper;
import seb.project.Codetech.product.service.ProductService;

@RestController
@RequestMapping("/api/product")
@Log4j2
public class ProductController {

	private final ProductMapper mapper;
	private final ProductService productService;

	public ProductController(ProductMapper mapper, ProductService productService) {
		this.mapper = mapper;
		this.productService = productService;
	}

	@PostMapping("/create") // 제품을 생성한다.
	public ResponseEntity<Product> postProduct(@RequestPart List<MultipartFile> files,
											   @RequestPart @Valid ProductDto.Post request,
											   @AuthenticationPrincipal String email) throws IOException {
		Product dtoToProduct = mapper.productPostDtoToProduct(request);
		Product serviceProduct = productService.createProduct(email, files, dtoToProduct);
		return ResponseEntity.status(HttpStatus.CREATED).body(serviceProduct);
	}

	@PatchMapping("/modify") // 등록된 제품을 수정한다.
	public ResponseEntity<Product> patchProduct(@RequestPart List<MultipartFile> files,
												@RequestPart @Valid ProductDto.Patch request,
												@AuthenticationPrincipal String email) throws IOException {
		Product dtoToProduct = mapper.productPatchDtoToProduct(request);
		Product serviceProduct = productService.modifyProduct(email, files, dtoToProduct);
		return ResponseEntity.ok(serviceProduct);
	}

	@GetMapping("/product") // 등록된 제품을 조회한다.
	public ResponseEntity<Product> getProduct(@RequestBody @Valid ProductDto.Get getDto) {
		Product dtoToProduct = mapper.productGetDtoToProduct(getDto);
		Product serviceProduct = productService.findProduct(dtoToProduct);
		return ResponseEntity.ok(serviceProduct);
	}

	@GetMapping("/products") // 등록된 모든 제품을 조회한다.
	public ResponseEntity<PageListDto<ProductResponseDto>> getProducts(@RequestBody @Valid PageInfo.Request request) {
		Page<Product> pageProduct = productService.findAllProduct(request);
		List<Product> products = pageProduct.getContent();
		return ResponseEntity.ok(new PageListDto<>(mapper.productsDtoToProductResponse(products), pageProduct));
	}

	@DeleteMapping("/remove") // 등록된 제품을 삭제한다.
	public ResponseEntity<Product> deleteProduct(@AuthenticationPrincipal String email,
												 @RequestBody @Valid ProductDto.Get getDto) throws IOException {
		Product dtoToProduct = mapper.productGetDtoToProduct(getDto);
		productService.removeProduct(email, dtoToProduct);
		return ResponseEntity.ok().build();
	}
}
