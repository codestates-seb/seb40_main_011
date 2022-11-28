package seb.project.Codetech.productstat.controller;

import javax.validation.constraints.Positive;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.productstat.dto.ProductStatResponseDto;
import seb.project.Codetech.productstat.service.ProductStatService;

@RestController
@RequestMapping("/api/product-stats")
@RequiredArgsConstructor
public class ProductStatController {
	private final ProductStatService productStatService;

	@GetMapping("/{productId}")
	public ResponseEntity<ProductStatResponseDto.Snack> getProductStatOfSnack(@Positive @PathVariable Long productId) {
		ProductStatResponseDto.Snack response = new ProductStatResponseDto.Snack(
			productStatService.findVerifiedOne(productId)
		);

		return ResponseEntity.ok(response);
	}
}
