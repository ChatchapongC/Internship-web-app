package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { //for retrieve entities in DB.
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
<<<<<<< HEAD
=======

    public User findByResetPasswordToken(String token);
>>>>>>> 89ee28efb7634b5bd98c69d927e860407d6c4dea
}
