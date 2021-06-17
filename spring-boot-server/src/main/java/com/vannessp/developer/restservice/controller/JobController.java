package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.repository.JobRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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


}
