package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Company;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    //Just for test case
    @GetMapping("/business/test")
    public ResponseEntity<Company> initialBusinessTest(){
        Company company = new Company();
        company.setId(1L);
        company.setName("business1");
        company.setType("business1_type");
        company.setContact_number("023456789");
        company.setEmail("business1@mail.com");

        companyRepository.save(company);
        return ResponseEntity.ok(company);
    }


    @GetMapping("/business/{id}")
    public ResponseEntity<Company> getBusinessById(@PathVariable Long id){
        Company company = companyRepository.findById(id).orElseThrow(() -> new BadRequestException("Error bussiness is not found!!"));
        return ResponseEntity.ok(company);
    }

    @GetMapping("/business/{id}/jobs")
    public ResponseEntity<List<Job>> getJobOfBusiness(@PathVariable Long id){
        List<Job> job = companyRepository.findById(id).get().getJobs();
        return ResponseEntity.ok(job);
    }

    @GetMapping("/business/all")
    public ResponseEntity<List<Company>> getBusiness(){
        List<Company> allCompanies = companyRepository.findAll();
        return ResponseEntity.ok(allCompanies);
    }
}
