package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.repository.JobRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/api")
public class JobController {

    @Autowired
    private JobRespository jobRepository;

    @GetMapping("/job/{id}")
    public ResponseEntity<Job> getJobbyId(@PathVariable Long id){
        Job job = jobRepository.findById(id).orElseThrow(()-> new BadRequestException("Error job not found"));
        return ResponseEntity.ok(job);
    }

    @GetMapping("/job/bus_name/{business_name}")
    public ResponseEntity<Job> getJobByBusinessName(@PathVariable String business_name){
        Job job = jobRepository.findByBusiness_name(business_name);
        return ResponseEntity.ok(job);
    }

/*    @GetMapping("/job/bus_name/{business_name}")
    public ResponseEntity<List<Job>> getJobByBusinessName(@PathVariable String business_name){
        List<Job> jobs = jobRepository.findAll();
        List<Job> result = null;
        for (Job j:jobs) {
            if(j.getBusiness_name().equals(business_name))
            {
                result.add(j);
            }
        }
        return ResponseEntity.ok(result);
    }*/
}
