package seb.project.Codetech.user.service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.entity.Question;
import seb.project.Codetech.question.respository.QuestionRepository;
import seb.project.Codetech.recommend.entity.Recommend;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.repository.ReviewRepository;
import seb.project.Codetech.security.auth.jwt.JwtTokenizer;
import seb.project.Codetech.security.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.user.dto.*;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthorityUtils authorityUtils;
    private final ApplicationEventPublisher publisher;
    private final RedisTemplate<String,String> redisTemplate;
    private final QuestionRepository questionRepository;
    private final ReviewRepository reviewRepository;
    private final JwtTokenizer jwtTokenizer;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserAuthorityUtils authorityUtils,
                       ApplicationEventPublisher publisher, RedisTemplate<String,String> redisTemplate,
                       QuestionRepository questionRepository, ReviewRepository reviewRepository, JwtTokenizer jwtTokenizer){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.publisher = publisher;
        this.redisTemplate = redisTemplate;
        this.questionRepository = questionRepository;
        this.reviewRepository = reviewRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    public void logout(HttpServletRequest request, String email) {
        redisTemplate.opsForValue()
                .set(request.getHeader("Authorization"),"logout",30 * 60 * 1000L, TimeUnit.MILLISECONDS);
        redisTemplate.delete(email);
    }

    public User registerUser(User user) {
        verifyExistsEmail(user.getEmail());

        String encryptPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        user.setProvider("register");

        //        publisher.publishEvent(new UserRegistrationApplicationEvent(savedUser));

        return userRepository.save(user);
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public User updateUser( String email,UserPatchDto patchDto){
        User findUser = findVerifiedUser(findUserId(email));

        Optional.ofNullable(patchDto.getNickname()).ifPresent(findUser::setNickname);

        return findUser;
    }

    public Long findUserId(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser.getId();
    }

    public User findVerifiedUser(long id){
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User findUser(String email){
        Long id = findUserId(email);
        return findVerifiedUser(id);
    }

    public void withdrawUser(String email, UserWithdrawDto withdraw) {
        User findUser = findVerifiedUser(findUserId(email));
        if(!passwordEncoder.matches(withdraw.getPassword(), findUser.getPassword())){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }
        findUser.setStatus(true);
//        findUser.setEmail("null");
//        findUser.setNickname("탈퇴한 회원");
        userRepository.save(findUser);
    }

    public UserAndSnackReviewsDto userAndSnackReviewsDto(String email,int page, int size, String sort){
        User user = findUser(email);
        UserAndSnackReviewsDto userAndSnackReviewsDto = new UserAndSnackReviewsDto();
        List<SnackReview> snackReviews = user.getSnackReviews();
        List<UserAndSnackReviewsDto.MySnackReviewCard> cards = new ArrayList<>();
        for(SnackReview snackReview : snackReviews){
            cards.add(new UserAndSnackReviewsDto.MySnackReviewCard(snackReview));
        }
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by(sort).descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start+pageRequest.getPageSize()),cards.size());
        Page<UserAndSnackReviewsDto.MySnackReviewCard> cardPage = new PageImpl<>(cards.subList(start,end),pageRequest,cards.size());
        userAndSnackReviewsDto.setEmail(user.getEmail());
        userAndSnackReviewsDto.setNickname(user.getNickname());
        userAndSnackReviewsDto.setPoint(user.getPoint());
        userAndSnackReviewsDto.setImage(user.getImage());
        userAndSnackReviewsDto.setSnackReviews(cardPage);
        return userAndSnackReviewsDto;
    }

    public UserAndQuestionsDto userAndQuestionsDto(String email,int page, int size, String sort) {
        User user = findUser(email);
        UserAndQuestionsDto userAndQuestionsDto = new UserAndQuestionsDto();
        List<Question> questions = user.getQuestions();
        List<UserAndQuestionsDto.MyQuestionCard> cards = new ArrayList<>();
        for (Question question : questions){
            cards.add(new UserAndQuestionsDto.MyQuestionCard(question));
        }
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by(sort).descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start+pageRequest.getPageSize()),cards.size());
        Page<UserAndQuestionsDto.MyQuestionCard> cardPage = new PageImpl<>(cards.subList(start,end),pageRequest,cards.size());
        userAndQuestionsDto.setEmail(user.getEmail());
        userAndQuestionsDto.setNickname(user.getNickname());
        userAndQuestionsDto.setPoint(user.getPoint());
        userAndQuestionsDto.setImage(user.getImage());
        userAndQuestionsDto.setQuestions(cardPage);
        return userAndQuestionsDto;
    }

    public UserAndReviewsDto userAndReviewsDto(String email,int page, int size, String sort){
        User user = findUser(email);
        UserAndReviewsDto userAndReviewsDto = new UserAndReviewsDto();
        List<Review> reviews = user.getReviews();
        List<UserAndReviewsDto.MyReviewCard> cards = new ArrayList<>();
        for (Review review : reviews){
            cards.add(new UserAndReviewsDto.MyReviewCard(review));
        }
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by(sort).descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start+pageRequest.getPageSize()),cards.size());
        Page<UserAndReviewsDto.MyReviewCard> cardPage = new PageImpl<>(cards.subList(start,end),pageRequest,cards.size());
        userAndReviewsDto.setEmail(user.getEmail());
        userAndReviewsDto.setNickname(user.getNickname());
        userAndReviewsDto.setPoint(user.getPoint());
        userAndReviewsDto.setImage(user.getImage());
        userAndReviewsDto.setReviews(cardPage);
        return userAndReviewsDto;
    }

    public UserAndQuestionsDto userAndAnswersDto(String email,int page, int size, String sort){
        User user = findUser(email);
        UserAndQuestionsDto userAndAnswersDto = new UserAndQuestionsDto();
        List<Answer> answers = user.getAnswers();
        List<Question> questionList = questionRepository.findAllByAnswersIn(answers);
        List<UserAndQuestionsDto.MyQuestionCard> cards = new ArrayList<>();
        for (Question question : questionList){
            cards.add(new UserAndQuestionsDto.MyQuestionCard(question));
        }
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by(sort).descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start+pageRequest.getPageSize()),cards.size());
        Page<UserAndQuestionsDto.MyQuestionCard> cardPage = new PageImpl<>(cards.subList(start,end),pageRequest,cards.size());
        userAndAnswersDto.setEmail(user.getEmail());
        userAndAnswersDto.setNickname(user.getNickname());
        userAndAnswersDto.setPoint(user.getPoint());
        userAndAnswersDto.setImage(user.getImage());
        userAndAnswersDto.setQuestions(cardPage);
        return userAndAnswersDto;

    }

    public UserAndReviewsDto userAndRecommendsDto(String email, int page, int size, String sort) {
        User user = findUser(email);
        UserAndReviewsDto userAndRecommendsDto = new UserAndReviewsDto();
        List<Recommend> recommends = user.getRecommends();
        List<Review> reviewList = reviewRepository.findAllByRecommendsIn(recommends);
        List<UserAndReviewsDto.MyReviewCard> cards = new ArrayList<>();
        for (Review review : reviewList){
            cards.add(new UserAndReviewsDto.MyReviewCard(review));
        }
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by(sort).descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start+pageRequest.getPageSize()),cards.size());
        Page<UserAndReviewsDto.MyReviewCard> cardPage = new PageImpl<>(cards.subList(start,end),pageRequest,cards.size());
        userAndRecommendsDto.setEmail(user.getEmail());
        userAndRecommendsDto.setNickname(user.getNickname());
        userAndRecommendsDto.setPoint(user.getPoint());
        userAndRecommendsDto.setImage(user.getImage());
        userAndRecommendsDto.setReviews(cardPage);
        return userAndRecommendsDto;
    }

    public User checkPassword(String email, UserPasswordDto passwordDto) {
        User loginUser = findUser(email);
        String password = passwordDto.getOldPassword();
        if(!passwordEncoder.matches(password, loginUser.getPassword())){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }
        if(!passwordDto.getNewPassword().equals(passwordDto.getNewCheckPassword())){
            throw new BusinessLogicException(ExceptionCode.NEW_PASSWORD_NOT_MATCH);
        }
        loginUser.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
        userRepository.save(loginUser);
        return loginUser;
    }

    public User checkRefresh(HttpServletRequest request, HttpServletResponse response){

        String logoutToken = request.getHeader("Expired");
        String refresh = request.getHeader("Refresh");
        String jws = request.getHeader("Expired").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        User user = findUser(getAccount(jws,base64EncodedSecretKey));

        if (null != redisTemplate.opsForValue().get(logoutToken)) {
            throw new BusinessLogicException(ExceptionCode.NEED_LOGIN);
        }
        if(!Objects.equals(redisTemplate.opsForValue().get(user.getEmail()), refresh)){
            throw new BusinessLogicException(ExceptionCode.NEED_LOGIN);
        }
        String newAccessToken = newAccessToken(user);
        response.setHeader("Authorization", "Bearer " + newAccessToken);
        return user;
    }

    private String getAccount(String token,String base64EncodedSecretKey){
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key secretKey = Keys.hmacShaKeyFor(keyBytes);
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
        } catch (ExpiredJwtException ee) {
            ee.printStackTrace();
            return ee.getClaims().getSubject();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    private String newAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoles());
        claims.put("provider", user.getProvider());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }
}
