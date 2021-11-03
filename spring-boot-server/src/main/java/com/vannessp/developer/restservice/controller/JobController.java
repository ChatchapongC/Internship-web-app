package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Company.Job;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.JobRepository;
import com.vannessp.developer.restservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/job")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<Job> getAllJob(){
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id){
        Job job = jobRepository.findById(id).orElseThrow(()-> new BadRequestException("Error job not found"));
        return ResponseEntity.ok(job);
    }

    @GetMapping("/location")
    public ResponseEntity<?> getAllJobLocation() {
        List<String> location = jobRepository.findAllJobLocation();
        return ResponseEntity.ok().body(location);
    }

    @GetMapping("/category")
    public ResponseEntity<?> getAllJobCategory() {
        List<String> category = jobRepository.findAllJobCategory();
        return ResponseEntity.ok().body(category);
    }


    //with order list
//    @GetMapping("/startwith/{keyword}")
//    public ResponseEntity<?> getJobByFirstCharacter(@PathVariable String keyword){
//        List<Job> job = jobRepository.findByJobTitle(keyword);
//        return ResponseEntity.ok(job);
//    }

//    public List<Job> getRecommedJob(){
//        List<Job> job = jobRepository.findAll();
//        for (Job job_: job) {
//            if(job_.getRecommended().equals(true)) {
//                job.remove(job_);
//            }
//        }
//        return job;
//    }

//    @PostMapping("/post/{id}")
//    public ResponseEntity postJob(@RequestBody Job job, @PathVariable Long id) throws URISyntaxException {
//        Job savedJob = jobRepository.save(job);
////        String bname = savedJob.getBusiness_name();
////        Company company = companyRepository.findByBusiness_name(bname);
////        savedJob.setBusiness(company);
////        List<Job> list = company.getJobs();
////        list.add(savedJob);
////        company.setJobs(list);
//        Company currentCompany = companyRepository.findById(id).orElseThrow(RuntimeException::new);
//        List<Long> list = currentCompany.getJobs_list();
//        list.add(savedJob.getId());
//        currentCompany.setJobs_list(list);
//        companyRepository.save(currentCompany);
//        return ResponseEntity.created(new URI("/api/job/" + savedJob.getId())).body(savedJob);
//    }


//    @PutMapping("/edit/{id}")
//    public ResponseEntity editJob(@PathVariable Long id, @RequestBody Job job){
//        Job currentJob = jobRepository.findById(id).orElseThrow(RuntimeException::new);
//        currentJob.setTitle(job.getTitle());
//        currentJob.setJob_type(job.getJob_type());
//        currentJob.setAvailable_position(job.getAvailable_position());
//        currentJob.setTags(job.getTags());
//        currentJob.setBenefit(job.getBenefit());
//        currentJob.setLocation(job.getLocation());
//        //Date type
//        currentJob.setUpload_date(job.getUpload_date());
//        jobRepository.save(currentJob);
//        return ResponseEntity.ok(currentJob);
//    }

//    //@PathVariable Long id is user id
//    @PutMapping("/apply/{id}")
//    public ResponseEntity applyJob(@PathVariable Long id, @RequestBody Job job){
//        Job currentJob = jobRepository.findById(job.getId()).orElseThrow(RuntimeException::new);
//        List<Long> userApply = currentJob.getUser_apply();
//        userApply.add(id);
//        currentJob.setUser_apply(userApply);
//        jobRepository.save(currentJob);
//        return ResponseEntity.ok(currentJob);
//    }
//
//    @GetMapping("/apply/list/{id}")
//    public ResponseEntity showApplyList(@PathVariable Long id){
//        Optional<Job> user = jobRepository.findById(id);
//        List<Long> jobApply = user.get().getUser_apply();
//        List<User> userapplylist = userRepository.findAllById(jobApply);
//        return ResponseEntity.ok(userapplylist);
//    }


    @GetMapping("/recommended")
    public ResponseEntity<List<Job>> getRecommendJob(){
        List<Job> job = jobRepository.findByRecommend();
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
