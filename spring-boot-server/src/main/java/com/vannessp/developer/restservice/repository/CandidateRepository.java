package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Company.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

}
