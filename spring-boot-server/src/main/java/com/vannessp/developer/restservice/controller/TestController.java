package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.model.Company.Company;
import com.vannessp.developer.restservice.model.User.User;
import com.vannessp.developer.restservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/testapi")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

//    @PutMapping("/testcase")
//    public ResponseEntity<Job> testcase(){
//        Long num = Long.valueOf(12);
//        Job job_test = jobRepository.findById(num).get();
////        JobRequirement jobRequirement = new JobRequirement("Test","Test","Test","Test",null,"Test","Test");
//        JobRequirement jobRequirement = new JobRequirement();
////        jobRequirement.setId(job_test.getId());
////        jobRequirement.setJob(job_test);
//        jobRequirement.setId(job_test.getId());
//        jobRequirement.setDetail("test");
//        job_test.setRequirement(jobRequirement);
//        jobRepository.save(job_test);
//        return ResponseEntity.ok(job_test);
//    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> testUser(){
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/company")
    public ResponseEntity<List<Company>> testBusiness(){
        Random r = new Random();
        String[] type = {" IT - Software","Telecommunications","Marketing","Advertisement","Public relations"," Tourism"," Manufacturing"};

        for (char c='A' ; c<='Z' ; ++c)
        {
            Company company = new Company();
            company.setCompanyName(new StringBuilder().append("company").append(c).toString());
            company.setTypeOfBusiness(type[r.nextInt(type.length)]);
            company.setTelephoneNumber(getRandomPhoneNumber());
            companyRepository.save(company);
        }


        List<Company> bus = companyRepository.findAll();
        return ResponseEntity.ok(bus);
    }

//    @GetMapping("/job")
//    public ResponseEntity<List<Job>> testJob(){
//        String[] type = {   "Bangkok Dock Company",
//                            "Bangkok Insurance",
//                            "Banpu",
//                            "Benetone Films",
//                            "BTS Group Holdings",
//                            "Central Group",
//                            "Central Pattana",
//                            "Glow Energy",
//                            "Kiatnakin Bank",
//                            "Minor International",
//                            "Pace Development"};
//        for (int i=1; i<=10 ; i++)
//        {
//            Job job = new Job();
//            job.setTitle(new StringBuilder().append("job").append(i).append("_Title").toString());
//            job.setCompany_name(type[i]);
//            job.setJob_type(JobType.Internship);
//            int n = (int)(Math.random() * 5) + 1;
//            job.setAvailable_position(new StringBuilder().append(n).toString());
//            List<String> tag = new ArrayList<String>();
//            for (int j=1 ; j<=3 ; j++)
//                tag.add(new StringBuilder().append("tags_").append(j).toString());
//
//            job.setTags(tag);
//            int alw = (int) ((Math.random() * (1000 - 300)) + 300);
//            job.setAllowance(new StringBuilder().append(alw).append(" /day").toString());
//            job.setLocation(new StringBuilder().append("job").append(i).append("_location").toString());
//            long minDay = LocalDate.of(1970, 1, 1).toEpochDay();
//            long maxDay = LocalDate.of(2015, 12, 31).toEpochDay();
//            long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
//            LocalDate randomDate = LocalDate.ofEpochDay(randomDay);
//            job.setUpload_date(randomDate);
//
//            List<String> requirement = new ArrayList<String>();;
//            for (int j=1 ; j<=3 ; j++)
//                requirement.add(new StringBuilder().append("requirements_").append(j).toString());
//            job.setJob_requirement(requirement);
//
//            List<String> skill = new ArrayList<String>();;
//            for (int j=1 ; j<=3 ; j++)
//                skill.add(new StringBuilder().append("skills_").append(j).toString());
//            job.setSkill(skill);
//            if(i<=5)
//            {
//                job.setRecommend(true);
//            }
//            jobRepository.save(job);
//        }
//        List<Job> j = jobRepository.findAll();
////        List<Job> j = jobRespository.findByUploadDate("2019-12-31");
//        return ResponseEntity.ok(j);
//    }

    @GetMapping("/resetall")
    @ResponseBody
    public String resetall(){
        companyRepository.deleteAll();
        jobRepository.deleteAll();
        userRepository.deleteAll();
        candidateRepository.deleteAll();
        jobApplicationRepository.deleteAll();

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
