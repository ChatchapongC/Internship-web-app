package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Candidate.FavoriteJob;
import com.vannessp.developer.restservice.model.Company.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteJobRepository extends JpaRepository<FavoriteJob, Long> {

    Boolean existsByJobAndCandidate(Job job, Candidate candidate);
}
