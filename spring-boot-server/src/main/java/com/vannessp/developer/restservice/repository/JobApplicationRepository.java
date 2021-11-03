package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Candidate.JobApplication;
import com.vannessp.developer.restservice.model.Company.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    Boolean existsByJobAndCandidate(Job job, Candidate candidate);

    List<JobApplication> findByJob(Job job);

    Optional<JobApplication> findByCandidateIdAndJobId(Long candidateId, Long jobId);
}
