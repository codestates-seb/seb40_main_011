package seb.project.Codetech.user.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb.project.Codetech.global.auth.event.UserRegistrationApplicationEvent;
import seb.project.Codetech.global.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
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

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserAuthorityUtils authorityUtils,
                       ApplicationEventPublisher publisher, RedisTemplate<String,String> redisTemplate){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.publisher = publisher;
        this.redisTemplate = redisTemplate;
    }

    public void logout(HttpServletRequest request) {
        redisTemplate.opsForValue()
                .set(request.getHeader("Authorization"),"logout",30 * 60 * 1000L, TimeUnit.MILLISECONDS);
    }

    public User registerUser(User user) {
        verifyExistsEmail(user.getEmail());

        String encryptPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        publisher.publishEvent(new UserRegistrationApplicationEvent(savedUser));

        return savedUser;
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public User updateUser( String email, User user){
        User findUser = findVerifiedUser(findUserId(email));

        Optional.ofNullable(user.getNickname()).ifPresent(findUser::setNickname);

        if(user.getPassword()!=null){
            findUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(findUser);
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

    public void withdrawUser(String email, String password) {
        User findUser = findVerifiedUser(findUserId(email));
        log.info(password);
        log.info(findUser.getPassword());
        if(!passwordEncoder.matches(password, findUser.getPassword())){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }
        findUser.setStatus(true);
        userRepository.save(findUser);


    }
}
