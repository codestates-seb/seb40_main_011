package seb.project.Codetech.productstat.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.productstat.entity.ProductStat;
import seb.project.Codetech.productstat.repository.ProductStatRepository;
import seb.project.Codetech.review.repository.ReviewRepository;
import seb.project.Codetech.snackreview.repository.SnackReviewRepository;

@Service
@RequiredArgsConstructor
public class ProductStatService {
	private final ProductStatRepository productStatRepository;
	private final SnackReviewRepository snackReviewRepository;
	private final ReviewRepository reviewRepository;

	public ProductStat createProductStat(Long productId) {
		ProductStat productStat = getProductStatOfSnack(productId);
		setReviewCount(productStat);

		return saveProductStat(productStat);
	}

	public void updateProductStatOfSnack(Long productId) {
		Optional<ProductStat> found = productStatRepository.findById(productId);
		if (found.isEmpty()) {
			createProductStat(productId);
			return;
		}

		ProductStat productStat = getProductStatOfSnack(productId);
		productStat.updateReviewCount(found.get().getReviewCount());

		saveProductStat(productStat);
	}

	public void updateProductStatOfReview(Long productId) {
		Optional<ProductStat> found = productStatRepository.findById(productId);

		found.ifPresentOrElse(
			productStat -> {
				setReviewCount(productStat);
				saveProductStat(productStat);
			},
			() -> createProductStat(productId)
		);
	}

	public ProductStat findVerifiedOne(Long productId) {
		Optional<ProductStat> found = productStatRepository.findById(productId);
		return found.orElseGet(
			() -> createProductStat(productId));
	}

	private ProductStat saveProductStat(ProductStat productStat) {
		productStat.calculateAvgScore();
		return productStatRepository.save(productStat);
	}

	private ProductStat getProductStatOfSnack(Long productId) {
		return snackReviewRepository.searchInfoGroupByProductId(productId);
	}

	private void setReviewCount(ProductStat productStat) {
		productStat.updateReviewCount(
			reviewRepository.getReviewCountByProductId(productStat.getId())
		);
	}
}
