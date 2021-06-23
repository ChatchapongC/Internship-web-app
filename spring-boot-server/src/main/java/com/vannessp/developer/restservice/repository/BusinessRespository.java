package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Business;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRespository extends JpaRepository<Business, Long> {
    @Query(value = "select * from businesses b where b.name LIKE %?1%", nativeQuery = true)
    Job findByBusiness_name(String business_name);

    @Query(value = "select * from businesses b where b.type LIKE %?1%", nativeQuery = true)
    Job findByBusiness_type(String business_type);

    @Query(value = "select * from businesses b where b.email = ?1", nativeQuery = true)
    Job findByBusiness_email(String email);

    @Query(value = "select * from businesses b where b.contact_number = ?1", nativeQuery = true)
    Job findByBusiness_contactnumber(String contactnumber);

}
