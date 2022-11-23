package seb.project.Codetech.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb.project.Codetech.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
