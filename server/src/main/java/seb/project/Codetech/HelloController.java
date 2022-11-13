package seb.project.Codetech;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class HelloController {

	@GetMapping("/codetech")
	public String hello() {
		return "젠킨스 테스트 커밋 후 자동 빌드 성공!!!!!!!!";
	}
}
