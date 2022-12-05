package seb.project.Codetech.security.config;

import static org.springframework.security.config.Customizer.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
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
import seb.project.Codetech.security.oauth2.Service.CustomOAuth2UserService;
import seb.project.Codetech.security.oauth2.handler.OAuth2UserSuccessHandler;
import seb.project.Codetech.security.oauth2.provider.CustomOAuth2Provider;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {
	@Value("${spring.security.oauth2.client.registration.google.clientId}")
	private String googleClientId;
	@Value("${spring.security.oauth2.client.registration.google.clientSecret}")
	private String googleClientSecret;

	private final JwtTokenizer jwtTokenizer;
	private final UserAuthorityUtils authorityUtils;
	private final RedisTemplate<String, String> redisTemplate;
	private final UserService userService;
	private final UserRepository userRepository;

	public SecurityConfig(JwtTokenizer jwtTokenizer, UserAuthorityUtils authorityUtils,
						  RedisTemplate<String, String> redisTemplate, UserService userService,
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
//				.antMatchers(HttpMethod.POST, "/api/register").permitAll()
//				.antMatchers(HttpMethod.PATCH, "/api/user/**").hasRole("USER")
//				.antMatchers(HttpMethod.GET, "/api/user").hasRole("USER")
						.anyRequest().permitAll())
				.oauth2Login(oauth2 -> {
					oauth2.authorizationEndpoint().baseUri("/api/oauth2/authorize");
					oauth2.successHandler(
							new OAuth2UserSuccessHandler(jwtTokenizer, authorityUtils, userService, userRepository, redisTemplate));
					oauth2.userInfoEndpoint().userService(new CustomOAuth2UserService());
				});
		return http.build();

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
					jwtTokenizer, redisTemplate);
			jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");
			jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
			jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

			JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils,
					redisTemplate);

			builder
					.addFilter(jwtAuthenticationFilter)
					.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
		}
	}

	@Bean
	public ClientRegistrationRepository clientRegistrationRepository(OAuth2ClientProperties oAuth2ClientProperties,
																	 @Value("${spring.security.oauth2.client.registration.naver.clientId}")
																	 String naverClientId,
																	 @Value("${spring.security.oauth2.client.registration.naver.clientSecret}")
																	 String naverClientSecret,
																	 @Value("${spring.security.oauth2.client.registration.kakao.clientId}")
																		 String kakaoClientId,
																	 @Value("${spring.security.oauth2.client.registration.kakao.clientSecret}")
																		 String kakaoClientSecret) {
		List<ClientRegistration> registrations = oAuth2ClientProperties
				.getRegistration().keySet().stream()
				.map(client -> getRegistration(oAuth2ClientProperties, client))
				.filter(Objects::nonNull)
				.collect(Collectors.toList());

		registrations.add(CustomOAuth2Provider.NAVER.getBuilder("naver")
				.clientId(naverClientId)
				.clientSecret(naverClientSecret)
				.jwkSetUri("temp")
				.build());

		registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
				.clientId(kakaoClientId)
				.clientSecret(kakaoClientSecret)
				.jwkSetUri("temp")
				.build());
//		var clientRegistration = clientRegistration();
		return new InMemoryClientRegistrationRepository(registrations);
	}

	private ClientRegistration getRegistration(OAuth2ClientProperties clientProperties, String client) {
		if ("google".equals(client)) {
			OAuth2ClientProperties.Registration registration = clientProperties.getRegistration().get("google");
			return CommonOAuth2Provider
					.GOOGLE
					.getBuilder(client)
					.clientId(registration.getClientId())
					.clientSecret(registration.getClientSecret())
					.scope("email", "profile")
					.build();
		}
		return null;
	}
}
