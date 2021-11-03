package com.vannessp.developer.restservice.controller;


import com.vannessp.developer.restservice.model.Company.Company;
import com.vannessp.developer.restservice.model.Company.Job;
import com.vannessp.developer.restservice.payload.request.FilterRequest;
import com.vannessp.developer.restservice.payload.request.Resume.JobFilterRequest;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/job-filter")
public class JobFilterController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/title/{keyword}")
    public ResponseEntity<?> getJobByTitle(@PathVariable String keyword){
        List<Job> jobs = jobRepository.findByJobTitle(keyword);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/type/{keyword}")
    public ResponseEntity<?> getJobByType(@PathVariable String keyword){
        List<Job> jobs = jobRepository.findByJobType(keyword);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/location/{keyword}")
    public ResponseEntity<?> getJobByLocation(@PathVariable String keyword){
        List<Job> jobs = jobRepository.findByLocation(keyword);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<?> getJobByCompanyName(@PathVariable String companyName){
        List<Company> company = companyRepository.findByCompanyName(companyName);

        return ResponseEntity.ok(company);
    }

    @GetMapping("/category")
    public ResponseEntity<?> getJobByCategory(@PathVariable FilterRequest filterRequest){
        List<Job> jobs = jobRepository.findByCategory(filterRequest.getCategory());
        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    public ResponseEntity<List<Job>> filterJob(@RequestBody JobFilterRequest jobFilterRequest) {

        List<Job> jobs = jobRepository.findJobByTypeAndCategoryAndLocation(
                                                                jobFilterRequest.getJobType(),
                                                                jobFilterRequest.getJobCategory(),
                                                                jobFilterRequest.getLocation()
        );

        if(jobs == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(jobs);
    }
}
