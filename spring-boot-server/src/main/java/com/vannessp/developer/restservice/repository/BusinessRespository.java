package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Business;
import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRespository extends JpaRepository<Business, Long> {
}
