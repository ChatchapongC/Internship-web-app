package com.vannessp.developer.restservice.repository.Resume;

import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Candidate.Resume.Education;
import com.vannessp.developer.restservice.model.Candidate.Resume.Resume;
import com.vannessp.developer.restservice.model.Company.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByCandidateId(Long candidateId);

//    @Query("SELECT r FROM Resume r WHERE (:positionTitle is null or r.positionTitle = :positionTitle  )")
//    List<Resume> findResumeByPositionTitle(String type, String category, String location);

//    List<Resume> findResumeByEducations(Education education);

}
