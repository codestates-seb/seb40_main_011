package seb.project.Codetech.security.auth.filter;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import seb.project.Codetech.security.auth.jwt.JwtTokenizer;
import seb.project.Codetech.user.dto.UserLoginDto;
import seb.project.Codetech.user.entity.User;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final JwtTokenizer jwtTokenizer;
	private final RedisTemplate<String,String> redisTemplate;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer,
								   RedisTemplate<String,String> redisTemplate) {
		this.authenticationManager = authenticationManager;
		this.jwtTokenizer = jwtTokenizer;
		this.redisTemplate = redisTemplate;
	}

	@SneakyThrows
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

		ObjectMapper objectMapper = new ObjectMapper();
		UserLoginDto loginDto = objectMapper.readValue(request.getInputStream(), UserLoginDto.class);

		UsernamePasswordAuthenticationToken authenticationToken =
			new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

		return authenticationManager.authenticate(authenticationToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		FilterChain chain, Authentication authResult) throws ServletException, IOException {
		User user = (User)authResult.getPrincipal();

		String accessToken = delegateAccessToken(user);
		String refreshToken = delegateRefreshToken(user);

		if(Boolean.TRUE.equals(redisTemplate.hasKey(user.getEmail()))){
			redisTemplate.delete(user.getEmail());
		}
		redisTemplate.opsForValue()
				.set(user.getEmail(),refreshToken, 168 * 60 * 60 * 1000L, TimeUnit.MILLISECONDS);

		response.setHeader("Authorization", "Bearer " + accessToken);
		response.setHeader("Refresh", refreshToken);
		response.addIntHeader("id",user.getId().intValue());

		this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
	}

	private String delegateAccessToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("email", user.getEmail());
		claims.put("roles", user.getRoles());
		claims.put("provider",user.getProvider());

		String subject = user.getEmail();
		Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

		return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
	}

	private String delegateRefreshToken(User user) {
		String subject = user.getEmail();
		Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

		return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
	}
}
