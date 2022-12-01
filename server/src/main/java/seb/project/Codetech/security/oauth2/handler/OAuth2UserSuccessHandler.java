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

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
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
		var oAuth2User = (OAuth2User)authentication.getPrincipal();
		String username = String.valueOf(oAuth2User.getAttributes().get("email"));
		String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
		String provider = "oauth";
		String password = String.valueOf(oAuth2User.getAttributes().get("providerId"));
		List<String> authorities = authorityUtils.createRoles(username);
		if (userRepository.findByEmail(username).isEmpty()) {
			saveUser(nickname, username, password,provider);
		}
		redirect(request, response, username, provider, authorities);
	}

	private void redirect(HttpServletRequest request, HttpServletResponse response, String email, String provider,
		List<String> authorities) throws IOException {
		String accessToken = delegateAccessToken(email, authorities,provider);
		String refreshToken = delegateRefreshToken(email);
		redisTemplate.opsForValue()
				.set(email,refreshToken, 7 * 60 * 60 * 1000L, TimeUnit.MILLISECONDS);

		String uri = createURI("Bearer " +accessToken, refreshToken).toString();
		getRedirectStrategy().sendRedirect(request, response, uri);
	}

	private URI createURI(String accessToken, String refreshToken) {
		MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
		queryParams.add("access_token", accessToken);
		queryParams.add("refresh_token", refreshToken);

		return UriComponentsBuilder
			.newInstance()
			.scheme("https")
//			.host("localhost")
			.host("codetech.nworld.dev")
			.path("/receive-token")
//				.port(3000)
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
		User user = new User(nickname, email, password,provider);
		userService.registerUser(user);
		user.setProvider("oauth");
		userRepository.save(user);
	}
}
