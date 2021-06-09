package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.UserStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserStudent, String> { //for retrieve entities in DB.

}
