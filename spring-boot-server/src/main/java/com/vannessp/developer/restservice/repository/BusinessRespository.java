package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Business;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BusinessRespository extends JpaRepository<Business, Long> {
    @Query(value = "select * from jobs j where j.business_name LIKE %?1%", nativeQuery = true)
    Job findByBusiness_name(String business_name);

}
