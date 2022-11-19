package seb.project.Codetech.product.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import seb.project.Codetech.file.service.FileService;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.global.page.PageInfo;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.repository.ProductRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

@Service
public class ProductService {

	private final ProductRepository productRepository;
	private final UserRepository userRepository;
	private final FileService fileService;

	public ProductService(ProductRepository productRepository, UserRepository userRepository, FileService fileService) {
		this.productRepository = productRepository;
		this.userRepository = userRepository;
		this.fileService = fileService;
	}

	public Product createProduct(String email, List<MultipartFile> files, Product product) throws IOException {

		if (!findUser(email).getRoles().contains("USER")) // 회원만 제품을 등록 할 수 있다.
			throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_USE);

		for (MultipartFile file : files) {
			 product.setFile(fileService.saveFile(file));
		}

		product.setWriter(findUser(email).getNickname()); // 작성자를 기록한다 한번 기록하면 수정이 불가능해진다.
		product.setModifier(findUser(email).getNickname()); // 수정자도 동시에 작성자로 기록한다.
		return productRepository.save(product);
	}

	public Product modifyProduct(String email,List<MultipartFile> files, Product product) throws IOException {

		if (!findUser(email).getRoles().contains("USER")) // 회원만 제품을 수정 할 수 있다.
			throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_USE);

		Product findProduct = findProductId(product.getId());

		for (MultipartFile file : files)
			Optional.ofNullable(fileService.saveFile(file)).ifPresent(findProduct::setFile); // 파일 내역이 비어있다면 기존 파일 기록을 유지한다.

		Optional.ofNullable(product.getName()).ifPresent(findProduct::setName);
		Optional.ofNullable(findUser(email).getNickname()).ifPresent(findProduct::setModifier); // 수정한 유저 이름을 기록한다.
		Optional.ofNullable(product.getDetail()).ifPresent(findProduct::setDetail);
		return productRepository.save(findProduct);
	}

	public Product findProduct(Product product) {
		return productRepository.findById(product.getId())
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
	}

	public Page<Product> findAllProduct(PageInfo.Request request) {
		return productRepository.findAll(
			PageRequest.of(request.getPage(), request.getSize(), Sort.by("id").descending()));
	}

	public void removeProduct(String email, Product product) throws IOException {

		if (!findUser(email).getRoles().contains("ADMIN")) { // 작성된 제품 정보는 관리자만 삭제할 수 있다.
			throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_DELETE);
		}

		Product findProduct = findProductId(product.getId());

		productRepository.delete(product); // 외래키가 있는 제품 정보를 먼저 삭제한다.
		fileService.removeFiles(findProduct.getFile()); // 그 후에 파일 데이터를 삭제한다.
	}

	public Product findProductId(Long id) { // 제품 정보를 가져오기 위한 메소드
		return productRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
	}

	public User findUser(String email) { // 유저 데이터를 가져오기 위한 메소드
		return userRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_USE));
	}
}
