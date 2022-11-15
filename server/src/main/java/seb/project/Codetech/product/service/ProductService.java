package seb.project.Codetech.product.service;

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

	public Product findProduct(Product product) {
		return productRepository.findById(product.getId()).orElseThrow(() -> new RuntimeException("테스트"));
	}

	public Page<Product> findAllProduct(PageInfo.Request request) {
		return productRepository.findAll(PageRequest.of(request.getPage(), request.getSize(), Sort.by("id").descending()));
	}
}
