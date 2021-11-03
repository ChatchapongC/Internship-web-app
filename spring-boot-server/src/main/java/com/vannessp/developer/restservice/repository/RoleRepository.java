package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.User.ERole;
import com.vannessp.developer.restservice.model.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
