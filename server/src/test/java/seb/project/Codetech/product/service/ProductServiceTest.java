package seb.project.Codetech.product.service;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.product.entity.Type;
import seb.project.Codetech.product.repository.ProductRepository;

@SpringBootTest
class ProductServiceTest {

	@Autowired
	private ProductService productService;
	@Autowired
	private ProductRepository productRepository;

	@Test
	@Transactional
	void createProduct() {

		// given
		Product product = new Product();
		product.setName("젠하이저 HD 600");
		product.setType(Type.HEADSET);
		product.setDetail("음원 왜곡 최소화한 하이엔드 헤드폰 / 상세 스펙: 헤드폰 / 유선 / 오픈형 / 오버이어 / 다이나믹드라이버 / 연결방식: 3.5mm , 6.3mm / 300Ω / 97dB / 12Hz~39KHz / 무게: 260g / 다이나믹");
		product.setImage("/path/path/test.img");

		// when
		Product save = productRepository.save(product);

		// then
		assertThat(save.getName()).isEqualTo("젠하이저 HD 600");
		assertThat(save.getType()).isEqualTo(Type.HEADSET);
	}

	@Test
	@Transactional
	void modifyProduct() {

		// given
		Product product = new Product();
		product.setName("젠하이저 HD 600");
		product.setType(Type.HEADSET);
		product.setDetail("음원 왜곡 최소화한 하이엔드 헤드폰 / 상세 스펙: 헤드폰 / 유선 / 오픈형 / 오버이어 / 다이나믹드라이버 / 연결방식: 3.5mm , 6.3mm / 300Ω / 97dB / 12Hz~39KHz / 무게: 260g / 다이나믹");
		product.setImage("/path/path/test.img");

		Product originalSave = productRepository.save(product);
		assertThat(originalSave.getName()).isEqualTo("젠하이저 HD 600");
		assertThat(originalSave.getType()).isEqualTo(Type.HEADSET);

		// when
		Product setProduct = new Product();
		setProduct.setId(originalSave.getId());
		setProduct.setName("Audeze Mobius");
		setProduct.setDetail("유무선겸용 PC헤드셋 / 3.5mm / 블루투스 v4.2 / SBC / AAC / LDAC / 120dB / 10Hz~50KHz / 핸즈프리통화 / 사용시간: 10시간 / 충전단자: USB타입C / [형태] 오버이어 / 일체형조작부 / 컨트롤러기능: 볼륨 조절 , 마이크 ON,OFF / 마이크형태: 플렉시블 , 탈착형 / 무게: 350g / 3D오디오앰비소닉스지원 / 3D하드웨어프로세실WavesNx기술 / 사운드위치측정 / 헤드트래킹기술지원");
		setProduct.setImage("/path/path/test2.img");
		Product savePatch = productRepository.save(setProduct);

		// then
		assertThat(savePatch.getName()).isEqualTo("Audeze Mobius");
		assertThat(savePatch.getImage()).isEqualTo("/path/path/test2.img");
	}

	@Test
	@Transactional
	void getProduct() {

		// given
		Product product = new Product();
		product.setName("젠하이저 HD 600");
		product.setType(Type.HEADSET);
		product.setDetail("음원 왜곡 최소화한 하이엔드 헤드폰 / 상세 스펙: 헤드폰 / 유선 / 오픈형 / 오버이어 / 다이나믹드라이버 / 연결방식: 3.5mm , 6.3mm / 300Ω / 97dB / 12Hz~39KHz / 무게: 260g / 다이나믹");
		product.setImage("/path/path/test.img");

		// when
		Product save = productRepository.save(product);
		Product serviceProduct = productService.findProduct(save);

		// then
		assertThat(serviceProduct.getName()).isEqualTo("젠하이저 HD 600");
		assertThat(serviceProduct.getType()).isEqualTo(Type.HEADSET);
	}
}