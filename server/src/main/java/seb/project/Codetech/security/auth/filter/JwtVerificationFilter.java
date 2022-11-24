package seb.project.Codetech.security.auth.filter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.security.auth.jwt.JwtTokenizer;
import seb.project.Codetech.security.auth.utils.UserAuthorityUtils;

public class JwtVerificationFilter extends OncePerRequestFilter {
	private final JwtTokenizer jwtTokenizer;
	private final UserAuthorityUtils authorityUtils;
	private final RedisTemplate<String, String> redisTemplate;

	public JwtVerificationFilter(JwtTokenizer jwtTokenizer, UserAuthorityUtils authorityUtils,
		RedisTemplate<String, String> redisTemplate) {
		this.jwtTokenizer = jwtTokenizer;
		this.authorityUtils = authorityUtils;
		this.redisTemplate = redisTemplate;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		try {
			Map<String, Object> claims = verifyJws(request);
			setAuthenticationToConText(claims);
		} catch (SignatureException se) {
			request.setAttribute("exception", se);
		} catch (ExpiredJwtException ee) {
			request.setAttribute("exception", ee);
		} catch (Exception e) {
			request.setAttribute("exception", e);
		}

		String logoutToken = request.getHeader("Authorization");
		if (null != redisTemplate.opsForValue().get(logoutToken)) {
			throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
		}

		filterChain.doFilter(request, response);

	}

	private void setAuthenticationToConText(Map<String, Object> claims) {
		String username = (String)claims.get("username");
		List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
		Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	private Map<String, Object> verifyJws(HttpServletRequest request) {
		String jws = request.getHeader("Authorization").replace("Bearer", "");
		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

		return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String authorization = request.getHeader("Authorization");

		return authorization == null || !authorization.startsWith("Bearer");
	}
}
