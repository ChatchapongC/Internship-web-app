package com.vannessp.developer.restservice.repository.Resume;

import com.vannessp.developer.restservice.model.Candidate.Resume.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Long> {

    Optional<Education> findByResumeId(Long resumeId);

    Optional<Education> findByIdAndResumeId(Long educationId, Long resumeId);

    Boolean existsByResumeId(Long resumeId);
}
