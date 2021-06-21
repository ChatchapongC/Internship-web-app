package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.JobType;
import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JobRespository extends JpaRepository<Job, Long> {

    @Query(value = "select * from jobs j where j.business_name LIKE %?1%", nativeQuery = true)
    Job findByBusiness_name(String business_name);

    @Query(value = "select * from jobs j where j.avaliable_position LIKE %?1%", nativeQuery = true)
    List<Job> findByAvaliablePosition(String position);

    @Query(value = "select * from jobs j where j.jobtype = ?1", nativeQuery = true)
    List<Job> findByJobType(String jobtype);

    @Query(value = "select * from jobs j where j.jobtype LIKE %?1%", nativeQuery = true)
    List<Job> findByTags(String jobtype);

    

    @Query(value = "select * from jobs j where j.business_name LIKE ?1% order by j.business_name", nativeQuery = true)
    List<Job> findWithfirstCharacter(String c);
}
