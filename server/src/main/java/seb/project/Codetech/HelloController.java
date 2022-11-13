package seb.project.Codetech;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class HelloController {

	@GetMapping("/codetech")
	public String hello() {
		return "codeTech is CI/CD run? ok change? 0.0.4";
	}
}
