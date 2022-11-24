package seb.project.Codetech.security.auth.handler;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;
import seb.project.Codetech.global.response.ErrorResponse;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException {
		log.error("로그인 실패: {}", exception.getMessage());
		sendErrorResponse(response);
	}

	private void sendErrorResponse(HttpServletResponse response) throws IOException {
		Gson gson = new Gson();
		ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
	}
}
