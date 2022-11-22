package seb.project.Codetech.redis.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.redis.entity.ProductStat;
import seb.project.Codetech.redis.repository.ProductStatRepository;
import seb.project.Codetech.snackreview.repository.SnackReviewRepository;

@Service
@RequiredArgsConstructor
public class ProductStatService {
	private final ProductStatRepository productStatRepository;
	private final SnackReviewRepository snackReviewRepository;

	public ProductStat saveProductStat(ProductStat productStat) {
		productStat.calculateAvgScore();
		return productStatRepository.save(productStat);
	}

	public ProductStat getProductStat(Long productId) {
		return snackReviewRepository.searchInfoGroupByProductId(productId);
	}

	public ProductStat createProductStat(Long productId) {
		ProductStat productStat = getProductStat(productId);
		return saveProductStat(productStat);
	}

	public ProductStat updateProductStat(Long productId) {
		ProductStat productStat = getProductStat(productId);
		return saveProductStat(productStat);
	}

	public void deleteProductStatById(Long id) {
		productStatRepository.delete(findVerifiedOne(id));
	}

	public ProductStat findVerifiedOne(Long productId) {
		Optional<ProductStat> found = productStatRepository.findById(productId);
		return found.orElseGet(
			() -> createProductStat(productId));
	}
}
