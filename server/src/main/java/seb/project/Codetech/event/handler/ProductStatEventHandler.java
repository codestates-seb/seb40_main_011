package seb.project.Codetech.event.handler;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.event.dto.ReviewUpdateEvent;
import seb.project.Codetech.event.dto.SnackReviewUpdateEvent;
import seb.project.Codetech.productstat.service.ProductStatService;

@Component
@RequiredArgsConstructor
public class ProductStatEventHandler {
	private final ProductStatService productStatService;

	@EventListener
	public void updateProductStatOfSnack(SnackReviewUpdateEvent snackReviewUpdateEvent) {
		productStatService.updateProductStatOfSnack(snackReviewUpdateEvent.getProductId());
	}

	@EventListener
	public void updateProductStatOfReview(ReviewUpdateEvent reviewUpdateEvent) {
		productStatService.updateProductStatOfReview(reviewUpdateEvent.getProductId());
	}
}
