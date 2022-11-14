package seb.project.Codetech.user.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

import java.util.Optional;

@Service
@Transactional
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public User registerUser(User user) {
        verifyExistsEmail(user.getEmail());

        User savedUser = userRepository.save(user);

        return savedUser;
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) throw new IllegalArgumentException("이미 사용중인 이메일 입니다.");
    }
}
