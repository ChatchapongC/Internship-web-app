package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.model.Business;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.JobType;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.BusinessRespository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.repository.JobRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/testapi")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRespository businessRespository;

    @Autowired
    private JobRespository jobRespository;

    @GetMapping("/user")
    public ResponseEntity<List<User>> testUser(){
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/business")
    public ResponseEntity<List<Business>> testBusiness(){


//        for (int i=1 ; i<=10 ; i++)
//        {
//            Business business = new Business();
//            business.setName(new StringBuilder().append("business").append(i).toString());
//            business.setType(new StringBuilder().append("business").append(i).append("_type").toString());
//            business.setContact_number(getRandomPhoneNumber());
//            business.setEmail(new StringBuilder().append("business").append(i).append("@mail.com").toString());
//            businessRespository.save(business);
//        }
        List<Business> bus = businessRespository.findAll();
        return ResponseEntity.ok(bus);
    }

    @GetMapping("/job")
    public ResponseEntity<List<Job>> testJob(){

//        for (int i=1 ; i<=10 ; i++)
//        {
//            Job job = new Job();
//            job.setTitle(new StringBuilder().append("job").append(i).toString());
//            job.setBusiness_name(new StringBuilder().append("job").append(i).append("_business_name").toString());
//            job.setJobtype(JobType.Internship);
//            job.setAvaliable_position(new StringBuilder().append("job").append(i).append("_avaliable_position").toString());
//            job.setTags(new StringBuilder().append("job").append(i).append("_tags").toString());
//            job.setLocation(new StringBuilder().append("job").append(i).append("_location").toString());
//            job.setUpload_date(LocalDate.parse("2019-12-31"));
//            jobRespository.save(job);
//        }
        List<Job> j = jobRespository.findAll();
//        List<Job> j = jobRespository.findByUploadDate("2019-12-31");
        return ResponseEntity.ok(j);
    }

    public static String getRandomPhoneNumber(){
        String phoneNumber = "0";
        for (int i=1 ; i<=8 ; i++)
        {
            int x = (int)(Math.random()*((9-1)+1))+1;
            phoneNumber = phoneNumber+x;
        }
        return phoneNumber;
    }
}
