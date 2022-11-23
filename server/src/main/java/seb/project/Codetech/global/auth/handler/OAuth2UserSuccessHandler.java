package seb.project.Codetech.global.auth.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import seb.project.Codetech.global.auth.jwt.JwtTokenizer;
import seb.project.Codetech.global.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;
import seb.project.Codetech.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final UserAuthorityUtils authorityUtils;
    private final UserService userService;
    private final UserRepository userRepository;

    public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer, UserAuthorityUtils authorityUtils,
                                    UserService userService, UserRepository userRepository){
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException{
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
//        String provider = "google";
        String password = String.valueOf(oAuth2User.getAttributes().get("providerId"));
        List<String> authorities = authorityUtils.createRoles(email);
        if(userRepository.findByEmail(email) == null){

        saveUser(email,nickname,password);}
        redirect(request,response,email,authorities);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username,
                          List<String> authorities) throws IOException{
        String accessToken = delegateAccessToken(username,authorities);
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken,refreshToken).toString();
        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token",accessToken);
        queryParams.add("refresh_token",refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(80)
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);
        return refreshToken;
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username",username);
        claims.put("roles",authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);
        return accessToken;
    }

    private void saveUser(String nickname, String email, String password) {
        User user = new User(nickname, email, password);
        userService.registerUser(user);
    }
}
