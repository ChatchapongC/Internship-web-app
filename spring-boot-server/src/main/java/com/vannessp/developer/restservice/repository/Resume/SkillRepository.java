package com.vannessp.developer.restservice.repository.Resume;

import com.vannessp.developer.restservice.model.Candidate.Resume.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByIdAndResumeId(Long id, Long resumeId);

    List<Skill> findByResumeId(Long resumeId);
}
