package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<User> findByResetPasswordToken(String token);

    Boolean existsByResetPasswordToken(String token);

    Optional<User> findByVerificationCode(String code);

    Boolean existsByVerificationCode(String code);
}
