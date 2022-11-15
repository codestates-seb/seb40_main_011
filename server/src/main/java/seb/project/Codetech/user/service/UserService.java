package seb.project.Codetech.user.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb.project.Codetech.global.auth.event.UserRegistrationApplicationEvent;
import seb.project.Codetech.global.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthorityUtils authorityUtils;
    private final ApplicationEventPublisher publisher;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserAuthorityUtils authorityUtils,
                       ApplicationEventPublisher publisher){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.publisher = publisher;
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

    public User updateUser(User user, Long id){
        User findUser = findVerifiedUser(user.getId());

        Optional.ofNullable(user.getEmail()).ifPresent(findUser::setEmail);
        Optional.ofNullable(user.getNickname()).ifPresent(findUser::setNickname);
        Optional.ofNullable(user.getImage()).ifPresent(findUser::setImage);

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
}
