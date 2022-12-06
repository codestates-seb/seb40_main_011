package seb.project.Codetech.security.oauth2.handler;

import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import seb.project.Codetech.security.auth.jwt.JwtTokenizer;
import seb.project.Codetech.security.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;
@Log4j2
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final JwtTokenizer jwtTokenizer;
	private final UserAuthorityUtils authorityUtils;
	private final UserService userService;
	private final UserRepository userRepository;
	private final RedisTemplate<String,String> redisTemplate;

	public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer, UserAuthorityUtils authorityUtils,
		UserService userService, UserRepository userRepository, RedisTemplate<String,String> redisTemplate) {
		this.jwtTokenizer = jwtTokenizer;
		this.authorityUtils = authorityUtils;
		this.userService = userService;
		this.userRepository = userRepository;
		this.redisTemplate = redisTemplate;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		try{
		String registrationId = ((OAuth2AuthenticationToken)authentication).getAuthorizedClientRegistrationId();
		if(registrationId.equals("google")) {
			var oAuth2User = (OAuth2User) authentication.getPrincipal();
			String username = String.valueOf(oAuth2User.getAttributes().get("email"));
			String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
			String provider = "google";
			String password = String.valueOf(oAuth2User.getAttributes().get("providerId"));
			List<String> authorities = authorityUtils.createRoles(username);
			if (userRepository.findByEmail(username).isEmpty()) {
				saveUser(nickname, username, password, provider);
			}
			redirect(request, response, username, provider, authorities);
		}

		if(registrationId.equals("naver")) {
			var oAuth2User = (OAuth2User) authentication.getPrincipal();
			String username = String.valueOf(oAuth2User.getAttributes().get("email"));
			String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
			String provider = "naver";
			String password = String.valueOf(oAuth2User.getAttributes().get("providerId"));
			List<String> authorities = authorityUtils.createRoles(username);
			if (userRepository.findByEmail(username).isEmpty()) {
				saveUser(nickname, username, password, provider);
			}
			redirect(request, response, username, provider, authorities);
		}

		if(registrationId.equals("kakao")) {
			var oAuth2User = (OAuth2User) authentication.getPrincipal();
			log.info(authentication.getPrincipal());
			log.info(oAuth2User.getAttributes());
			HashMap userInfo = oAuth2User.getAttribute("properties");
			String username = oAuth2User.getAttribute("id").toString()+"@nworld.dev";
			String nickname = userInfo.get("nickname").toString();
			String provider = "kakao";
			String password = oAuth2User.getAttribute("id").toString()+userInfo.get("profile_image").toString();
			List<String> authorities = authorityUtils.createRoles(username);
			if (userRepository.findByEmail(username).isEmpty()) {
				saveUser(nickname, username, password, provider);
			}
			redirect(request, response, username, provider, authorities);
		}} catch (Exception e){throw e;}
	}

	private void redirect(HttpServletRequest request, HttpServletResponse response, String email, String provider,
		List<String> authorities) throws IOException {
		String accessToken = delegateAccessToken(email, authorities,provider);
		String refreshToken = delegateRefreshToken(email);
		redisTemplate.opsForValue()
				.set(email,refreshToken, 168 * 60 * 60 * 1000L, TimeUnit.MILLISECONDS);

		String uri = createURI("Bearer " +accessToken, refreshToken, email).toString();
		getRedirectStrategy().sendRedirect(request, response, uri);
	}

	private URI createURI(String accessToken, String refreshToken, String email) {
		MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
		queryParams.add("access_token", accessToken);
		queryParams.add("refresh_token", refreshToken);
		queryParams.add("id",userService.findUserId(email).toString());

		return UriComponentsBuilder
			.newInstance()
			.scheme("https")
//			.host("localhost")
			.host("codetech.nworld.dev")
//			.path("/api/token")
//				.port(3000)
				.path("/social")
			.queryParams(queryParams)
			.build()
			.toUri();
	}

	private String delegateRefreshToken(String email) {
		Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

		return jwtTokenizer.generateRefreshToken(email, expiration, base64EncodedSecretKey);
	}

	private String delegateAccessToken(String email, List<String> authorities, String provider) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("email", email);
		claims.put("roles", authorities);
		claims.put("provider", provider);

		Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

		return jwtTokenizer.generateAccessToken(claims, email, expiration, base64EncodedSecretKey);
	}

	private void saveUser(String nickname, String email, String password, String provider) {
		User user = new User(nickname, email, password, provider);
		userService.registerUser(user);
		user.setProvider(provider);
		userRepository.save(user);
	}
}
