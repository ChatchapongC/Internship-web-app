package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Company.Company;
import com.vannessp.developer.restservice.model.Company.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query(value = "select * from companies c where c.company_name LIKE %?1%", nativeQuery = true)
    List<Company> findByCompanyName(String companyName);

    @Query(value = "select * from businesses b where b.type LIKE %?1%", nativeQuery = true)
    Job findByBusiness_type(String business_type);

    @Query(value = "select * from businesses b where b.email = ?1", nativeQuery = true)
    Job findByBusiness_email(String email);

    @Query(value = "select * from businesses b where b.contact_number = ?1", nativeQuery = true)
    Job findByBusiness_contactnumber(String contactnumber);

}
