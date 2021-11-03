package com.vannessp.developer.restservice.repository.Resume;

import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Candidate.Resume.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByCandidateId(Long candidateId);

}
