package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { //for retrieve entities in DB.
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
