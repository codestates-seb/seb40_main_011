package seb.project.Codetech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CodetechApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodetechApplication.class, args);
	}

}
