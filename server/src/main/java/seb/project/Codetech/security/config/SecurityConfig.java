package seb.project.Codetech.security.config;

import static org.springframework.security.config.Customizer.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import seb.project.Codetech.security.auth.filter.JwtAuthenticationFilter;
import seb.project.Codetech.security.auth.filter.JwtVerificationFilter;
import seb.project.Codetech.security.auth.handler.UserAccessDeniedHandler;
import seb.project.Codetech.security.auth.handler.UserAuthenticationEntryPoint;
import seb.project.Codetech.security.auth.handler.UserAuthenticationFailureHandler;
import seb.project.Codetech.security.auth.handler.UserAuthenticationSuccessHandler;
import seb.project.Codetech.security.auth.jwt.JwtTokenizer;
import seb.project.Codetech.security.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.security.oauth2.handler.OAuth2UserSuccessHandler;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Value("${spring.security.oauth2.client.registration.google.clientId}")  // (1)
	private String clientId;

	@Value("${spring.security.oauth2.client.registration.google.clientSecret}") // (2)
	private String clientSecret;

	private final JwtTokenizer jwtTokenizer;
	private final UserAuthorityUtils authorityUtils;
	private final RedisTemplate<String, String> redisTemplate;
	private final UserService userService;
	private final UserRepository userRepository;

	public SecurityConfig(JwtTokenizer jwtTokenizer, UserAuthorityUtils authorityUtils,
		RedisTemplate<String, String> redisTemplate, @Lazy UserService userService,
		UserRepository userRepository) {
		this.jwtTokenizer = jwtTokenizer;
		this.authorityUtils = authorityUtils;
		this.redisTemplate = redisTemplate;
		this.userService = userService;
		this.userRepository = userRepository;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.headers().frameOptions().sameOrigin()
			.and()
			.csrf().disable()
			.cors(withDefaults())
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.formLogin().disable()
			.httpBasic().disable()
			.exceptionHandling()
			.authenticationEntryPoint(new UserAuthenticationEntryPoint())
			.accessDeniedHandler(new UserAccessDeniedHandler())
			.and()
			.apply(new CustomFilterConfigurer())
			.and()
			.authorizeHttpRequests(authorize -> authorize
				.antMatchers(HttpMethod.OPTIONS).permitAll()
				.antMatchers(HttpMethod.POST, "/api/register").permitAll()
				.antMatchers(HttpMethod.PATCH, "/api/user/**").hasRole("USER")
				.antMatchers(HttpMethod.GET, "/api/user").hasRole("USER")
				.anyRequest().permitAll())
			.oauth2Login(oauth2 -> oauth2
				.successHandler(
					new OAuth2UserSuccessHandler(jwtTokenizer, authorityUtils, userService, userRepository)));
		return http.build();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.addAllowedOriginPattern("*");
		configuration.addAllowedMethod("*");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
		configuration.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
		@Override
		public void configure(HttpSecurity builder) throws Exception {
			AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

			JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,
				jwtTokenizer);
			jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");
			jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
			jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

			JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils,
				redisTemplate);

			builder
				.addFilter(jwtAuthenticationFilter)
				.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
				.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
		}
	}

	@Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		var clientRegistration = clientRegistration();
		return new InMemoryClientRegistrationRepository(clientRegistration);
	}

	private ClientRegistration clientRegistration() {
		return CommonOAuth2Provider
			.GOOGLE
			.getBuilder("google")
			.clientId(clientId)
			.clientSecret(clientSecret)
			.build();
	}
}
