package seb.project.Codetech.product.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import seb.project.Codetech.global.page.PageInfo;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.repository.ProductRepository;

@Service
public class ProductService {

	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public Product createProduct(Product product) {
		return productRepository.save(product);
	}

	public Product modifyProduct(Product product) {
		Product findProduct = productRepository.findById(product.getId())
			.orElseThrow(() -> new RuntimeException("제품 정보를 찾을 수 없습니다."));
		Optional.ofNullable(product.getName()).ifPresent(findProduct::setName);
		Optional.ofNullable(product.getDetail()).ifPresent(findProduct::setDetail);
		Optional.ofNullable(product.getImage()).ifPresent(findProduct::setImage);
		return productRepository.save(findProduct);
	}

	public Product findProduct(Product product) {
		return productRepository.findById(product.getId())
			.orElseThrow(() -> new RuntimeException("제품 정보를 찾을 수 없습니다."));
	}

	public Page<Product> findAllProduct(PageInfo.Request request) {
		return productRepository.findAll(
			PageRequest.of(request.getPage(), request.getSize(), Sort.by("id").descending()));
	}

	public void removeProduct(Product product) {
		productRepository.delete(product);
	}

	public Product findProduct(Long id) {
		return productRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("제품 정보를 찾을 수 없습니다."));
	}
}
