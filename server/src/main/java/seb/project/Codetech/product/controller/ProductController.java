package seb.project.Codetech.product.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.service.FileService;
import seb.project.Codetech.global.page.PageInfo;
import seb.project.Codetech.global.page.PageListDto;
import seb.project.Codetech.product.dto.ProductDto;
import seb.project.Codetech.product.dto.ProductListResponse;
import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.mapper.ProductMapper;
import seb.project.Codetech.product.service.ProductService;

@RestController
@RequestMapping("/api/products")
@Log4j2
public class ProductController {

	private final ProductMapper mapper;
	private final ProductService productService;
	private final FileService fileService;

	public ProductController(ProductMapper mapper, ProductService productService, FileService fileService) {
		this.mapper = mapper;
		this.productService = productService;
		this.fileService = fileService;
	}

	@PostMapping // 제품을 생성한다.
	public ResponseEntity<ProductResponseDto> postProduct(@AuthenticationPrincipal String email,
		@RequestPart @Valid ProductDto.Post request,
		@RequestPart List<MultipartFile> file) throws IOException {
		Product dtoToProduct = mapper.productPostDtoToProduct(request);
		Product serviceProduct = productService.createProduct(email, dtoToProduct); // 제품 정보를 등록한다.
		List<FileEntity> fileEntities = fileService.insertFiles(file); // 파일 정보를 등록하고 파일을 로컬에 저장한다.
		fileService.setUploadProduct(serviceProduct, fileEntities); // 파일 정보를 제품에 등록한다.

		return ResponseEntity.status(HttpStatus.CREATED).body(mapper.productDtoToProductResponse(serviceProduct));
	}

	@PatchMapping("/{id}") // 등록된 제품을 수정한다.
	public ResponseEntity<ProductResponseDto> patchProduct(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id,
		@RequestPart @Valid ProductDto.Patch request,
		@RequestPart List<MultipartFile> file) throws IOException {
		Product dtoToProduct = mapper.productPatchDtoToProduct(id, request);
		Product serviceProduct = productService.modifyProduct(email, id, dtoToProduct);
		List<FileEntity> fileEntities = fileService.insertFiles(file);
		fileService.setUploadProduct(serviceProduct, fileEntities);

		return ResponseEntity.ok(mapper.productDtoToProductResponse(serviceProduct));
	}

	@GetMapping("/{id}") // 등록된 제품을 조회한다.
	public ResponseEntity<Product> getProduct(@PathVariable @Positive Long id) {
		Product serviceProduct = productService.findProduct(id);

		return ResponseEntity.ok(serviceProduct);
	}

	@GetMapping // 등록된 모든 제품을 조회한다.
	public ResponseEntity<PageListDto<ProductListResponse>> getProducts(@RequestBody @Valid PageInfo.Request request) {
		Page<Product> pageProduct = productService.findAllProduct(request);
		List<Product> products = pageProduct.getContent();

		return ResponseEntity.ok(new PageListDto<>(mapper.productsDtoToProductResponse(products), pageProduct));
	}

	@DeleteMapping("/{id}") // 등록된 제품을 삭제한다.
	public ResponseEntity<Product> deleteProduct(@AuthenticationPrincipal String email,
		@PathVariable Long id) {
		productService.removeProduct(email, id);

		return ResponseEntity.ok().build();
	}
}
