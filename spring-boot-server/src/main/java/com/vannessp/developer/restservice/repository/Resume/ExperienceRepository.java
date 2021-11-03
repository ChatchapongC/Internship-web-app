package com.vannessp.developer.restservice.repository.Resume;

import com.vannessp.developer.restservice.model.Candidate.Resume.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperienceRepository extends JpaRepository <Experience, Long> {
    Optional<Experience> findByIdAndResumeId(Long id, Long resumeId);

    List<Experience> findByResumeId(Long resumeId);
}
