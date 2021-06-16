package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRespository extends JpaRepository<Job, Long> {
}
