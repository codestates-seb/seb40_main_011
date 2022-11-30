package seb.project.Codetech.product.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.global.page.PageInfo;
import seb.project.Codetech.product.dto.ProductResponseDto;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.product.repository.ProductRepository;
import seb.project.Codetech.productstat.entity.ProductStat;
import seb.project.Codetech.productstat.service.ProductStatService;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

@Service
@Transactional(readOnly = true)
public class ProductService {

	private final ProductRepository productRepository;
	private final UserRepository userRepository;
	private final ProductStatService productStatService;

	public ProductService(ProductRepository productRepository, UserRepository userRepository,
		ProductStatService productStatService) {
		this.productRepository = productRepository;
		this.userRepository = userRepository;
		this.productStatService = productStatService;
	}

	@Transactional
	public Product createProduct(String email, Product product) {

		if (!findUser(email).getRoles().contains("USER")) // 회원만 제품을 등록 할 수 있다.
			throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_USE);

		product.setWriter(findUser(email).getNickname()); // 작성자를 기록한다 한번 기록하면 수정이 불가능해진다.
		product.setModifier(findUser(email).getNickname()); // 수정자도 동시에 작성자로 기록한다.
		return productRepository.save(product);
	}

	@Transactional
	public Product modifyProduct(String email, Long id, Product product) {

		if (!findUser(email).getRoles().contains("USER")) // 회원만 제품을 수정 할 수 있다.
			throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_USE);

		Product findProduct = findProductId(id);
		Optional.ofNullable(product.getName()).ifPresent(findProduct::setName);
		Optional.ofNullable(product.getType()).ifPresent(findProduct::setType);
		Optional.ofNullable(findUser(email).getNickname()).ifPresent(findProduct::setModifier); // 수정한 유저 이름을 기록한다.
		Optional.ofNullable(product.getDetail()).ifPresent(findProduct::setDetail);
		Optional.ofNullable(product.getFileEntities()).ifPresent(findProduct::setFileEntities);
		return productRepository.save(findProduct);
	}

	public Product findProduct(Long id) {
		return productRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
	}

	public Page<Product> findAllProduct(PageInfo.Request request) {
		return productRepository.findAll(
			PageRequest.of(request.getPage(), request.getSize(), Sort.by("id").descending()));
	}

	@Transactional
	public void removeProduct(String email, Long id) {

		if (!findUser(email).getRoles().contains("ADMIN")) { // 작성된 제품 정보는 관리자만 삭제할 수 있다.
			throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_DELETE);
		}

		Product findProduct = findProductId(id);
		productRepository.delete(findProduct);
	}

	public List<ProductResponseDto.Select> searchTypeProduct(Type type) {
		return productRepository.findByProductType(type);
	}

	public ProductResponseDto.MainPage searchMainPage() {
		List<ProductResponseDto.Card> cards = productRepository.searchMainPage();

		searchFilePathsOfMainPage(cards);
		setProductStatToCard(cards);

		return new ProductResponseDto.MainPage(cards);
	}

	public ProductResponseDto.Slice searchProduct(String keyword, Long offset, int limit) {
		List<ProductResponseDto.Search> searches = productRepository.searchProductByKeyword(keyword, offset, limit);
		boolean hasNext = productRepository.hasNext(searches, limit);

		return new ProductResponseDto.Slice(searches, hasNext);
	}

	public Product findProductId(Long id) { // 제품 정보를 가져오기 위한 메소드
		return productRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
	}

	public User findUser(String email) { // 유저 데이터를 가져오기 위한 메소드
		return userRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_USE));
	}

	private void setProductStatToCard(List<ProductResponseDto.Card> cards) {
		for (ProductResponseDto.Card card : cards) {
			ProductStat productStat = productStatService.findVerifiedOne(card.getId());
			card.setReviewCount(productStat.getReviewCount());
			card.setSnackCount(productStat.getSnackCount());
			card.setAvgScore(productStat.getAvgScore());
		}
	}

	private void searchFilePathsOfMainPage(List<ProductResponseDto.Card> cards) {
		List<Long> productIds = cards.stream()
			.map(c -> c.getId())
			.collect(Collectors.toList());

		Map<Long, String> fileMap = productRepository.searchFileSByProductIds(productIds);

		cards.forEach(
			card -> card.setFilePath(fileMap.get(card.getId()))
		);
	}
}
