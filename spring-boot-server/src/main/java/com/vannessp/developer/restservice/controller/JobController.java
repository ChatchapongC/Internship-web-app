package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.repository.JobRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class JobController {

    @Autowired
    private JobRespository jobRepository;

    @GetMapping("/job/{id}")
    public Optional<Job> getJobbyId(@RequestParam Long id){
        return jobRepository.findById(id);
    }


}
