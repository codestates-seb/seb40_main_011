package seb.project.Codetech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

@SpringBootApplication
@EnableJpaAuditing
public class CodetechApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodetechApplication.class, args);
	}

	@Bean
	Hibernate5Module hibernate5Module(){
		return new Hibernate5Module();
	}

}
