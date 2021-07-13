package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.model.Company;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.JobType;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.repository.JobRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/testapi")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRespository jobRespository;

    @GetMapping("/user")
    public ResponseEntity<List<User>> testUser(){
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/business")
    public ResponseEntity<List<Company>> testBusiness(){


        for (int i=1 ; i<=10 ; i++)
        {
            Company company = new Company();
            company.setName(new StringBuilder().append("company").append(i).toString());
            company.setType(new StringBuilder().append("company").append(i).append("_type").toString());
            company.setContact_number(getRandomPhoneNumber());
            company.setEmail(new StringBuilder().append("company").append(i).append("@mail.com").toString());
            companyRepository.save(company);
        }
        List<Company> bus = companyRepository.findAll();
        return ResponseEntity.ok(bus);
    }

    @GetMapping("/job")
    public ResponseEntity<List<Job>> testJob(){

        for (int i=1 ; i<=10 ; i++)
        {
            Job job = new Job();
            job.setTitle(new StringBuilder().append("job").append(i).toString());
            job.setBusiness_name(new StringBuilder().append("job").append(i).append("_business_name").toString());
            job.setJobtype(JobType.Internship);
            job.setAvaliable_position(new StringBuilder().append("job").append(i).append("_avaliable_position").toString());
            List<String> tag = new ArrayList<String>();
            for (int j=1 ; j<=3 ; j++)
                tag.add(new StringBuilder().append("tags_").append(j).toString());

            job.setTags(tag);
            job.setBenefit(30000);
            job.setLocation(new StringBuilder().append("job").append(i).append("_location").toString());
            job.setUpload_date(LocalDate.parse("2019-12-31"));

            List<String> requirement = new ArrayList<String>();;
            for (int j=1 ; j<=3 ; j++)
                requirement.add(new StringBuilder().append("requirements_").append(j).toString());
            job.setJob_requirement(requirement);

            List<String> skill = new ArrayList<String>();;
            for (int j=1 ; j<=3 ; j++)
                skill.add(new StringBuilder().append("skills_").append(j).toString());
            job.setSkill(skill);
            if(i<=5)
            {
                job.setRecommended(true);
            }
            jobRespository.save(job);
        }
        List<Job> j = jobRespository.findAll();
//        List<Job> j = jobRespository.findByUploadDate("2019-12-31");
        return ResponseEntity.ok(j);
    }

    @GetMapping("/resetall")
    @ResponseBody
    public String resetall(){
        companyRepository.deleteAll();
        jobRespository.deleteAll();
        return "Reset all data: Completed";
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
