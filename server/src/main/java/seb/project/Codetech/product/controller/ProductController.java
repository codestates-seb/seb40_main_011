package seb.project.Codetech.product.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.service.FileService;
import seb.project.Codetech.product.dto.ProductRequestDto;
import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
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
	public ResponseEntity<Long> postProduct(@AuthenticationPrincipal String email,
		@RequestPart @Valid ProductRequestDto.Post request,
		@RequestPart MultipartFile file) throws IOException {

		Product dtoToProduct = mapper.productPostDtoToProduct(request);
		FileEntity saveFile = fileService.saveFile(file);
		Product serviceProduct = productService.createProduct(email, dtoToProduct, saveFile); // 제품 정보를 등록한다.

		return ResponseEntity.status(HttpStatus.CREATED).body(serviceProduct.getId());
	}

	@PatchMapping("/{id}") // 등록된 제품을 수정한다.
	public ResponseEntity<Long> patchProduct(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id,
		@RequestPart @Valid ProductRequestDto.Patch request,
		@RequestPart MultipartFile file) throws IOException {

		Product dtoToProduct = mapper.productPatchDtoToProduct(id, request);
		FileEntity saveFile = fileService.saveFile(file);
		Product serviceProduct = productService.modifyProduct(email, id, dtoToProduct, saveFile);

		return ResponseEntity.ok(serviceProduct.getId());
	}

	@DeleteMapping("/{id}") // 등록된 제품을 삭제한다.
	public ResponseEntity<Product> deleteProduct(@AuthenticationPrincipal String email,
		@PathVariable @Positive Long id) {

		productService.removeProduct(email, id);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/{id}") // 등록된 제품을 조회한다.
	public ResponseEntity<ProductResponseDto.Get> getProduct(@PathVariable @Positive Long id) {

		ProductResponseDto.Get serviceProduct = productService.findProduct(id);

		return ResponseEntity.ok(serviceProduct);
	}

	@GetMapping("/review-search") // 타입을 입력해서 타입의 모든 제품들의 이름을 가져온다.
	public ResponseEntity<List<ProductResponseDto.Select>> getTypeProduct(@RequestParam @NotBlank Type type) {
		List<ProductResponseDto.Select> searchType = productService.searchTypeProduct(type);

		return ResponseEntity.ok(searchType);
	}

	@GetMapping("/main-search")
	public ResponseEntity<ProductResponseDto.MainPage> getMainPageProducts() {
		ProductResponseDto.MainPage mainPage = productService.searchMainPage();

		return ResponseEntity.ok(mainPage);
	}

	@GetMapping("/search")
	public ResponseEntity<ProductResponseDto.Slice> getSearchReview(
		@RequestParam @NotBlank String keyword,
		@RequestParam @PositiveOrZero Long offset,
		@RequestParam @Positive Integer limit) {

		ProductResponseDto.Slice searchProduct = productService.searchProduct(keyword, offset, limit);

		return ResponseEntity.ok(searchProduct);
	}
}
