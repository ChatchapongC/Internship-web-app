package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Company;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.JobRespository;
import com.vannessp.developer.restservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class JobController {

    @Autowired
    private JobRespository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/job/all")
    public ResponseEntity<List<Job>> getAllJob(){
        List<Job> allJob = jobRepository.findAll();
        return ResponseEntity.ok(allJob);
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<Job> getJobbyId(@PathVariable Long id){
        Job job = jobRepository.findById(id).orElseThrow(()-> new BadRequestException("Error job not found"));
        return ResponseEntity.ok(job);
    }

    @GetMapping("/job/bus_name/{business_name}")
    public ResponseEntity<List<Job>> getJobByBusinessName(@PathVariable String business_name){
        List<Job> job = jobRepository.findByBusiness_name(business_name);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/job/startwith/{keyword}")
    public ResponseEntity<List<Job>> getJobbyFirstCharacter(@PathVariable String keyword){
        //String keyword = "b";
        List<Job> job = jobRepository.findWithfirstCharacter(keyword);
        return ResponseEntity.ok(job);
    }

//    public List<Job> getRecommedJob(){
//        List<Job> job = jobRepository.findAll();
//        for (Job job_: job) {
//            if(job_.getRecommended().equals(true)) {
//                job.remove(job_);
//            }
//        }
//        return job;
//    }

    @PostMapping("/job/post")
    public ResponseEntity postJob(@RequestBody Job job) throws URISyntaxException {
        Job savedJob = jobRepository.save(job);
//        String bname = savedJob.getBusiness_name();
//        Company company = companyRepository.findByBusiness_name(bname);
//        savedJob.setBusiness(company);
//        List<Job> list = company.getJobs();
//        list.add(savedJob);
//        company.setJobs(list);
        return ResponseEntity.created(new URI("/api/job/" + savedJob.getId())).body(savedJob);
    }


    @PutMapping("/job/edit/{id}")
    public ResponseEntity editJob(@PathVariable Long id, @RequestBody Job job){
        Job currentJob = jobRepository.findById(id).orElseThrow(RuntimeException::new);
        currentJob.setTitle(job.getTitle());
        currentJob.setBusiness_name(job.getBusiness_name());
        currentJob.setJobtype(job.getJobtype());
        currentJob.setAvaliable_position(job.getAvaliable_position());
        currentJob.setTags(job.getTags());
        currentJob.setBenefit(job.getBenefit());
        currentJob.setLocation(job.getLocation());
        //Date type
        currentJob.setUpload_date(job.getUpload_date());
        jobRepository.save(currentJob);
        return ResponseEntity.ok(currentJob);
    }
    
    //@PathVariable Long id is user id
    @PutMapping("/job/apply/{id}")
    public ResponseEntity applyJob(@PathVariable Long id, @RequestBody Job job){
        Job currentJob = jobRepository.findById(job.getId()).orElseThrow(RuntimeException::new);
        List<Long> userApply = currentJob.getUser_apply();
        userApply.add(id);
        currentJob.setUser_apply(userApply);
        jobRepository.save(currentJob);
        return ResponseEntity.ok(currentJob);
    }

    @GetMapping("/job/apply/list/{id}")
    public ResponseEntity showApplyList(@PathVariable Long id){
        Optional<Job> user = jobRepository.findById(id);
        List<Long> jobApply = user.get().getUser_apply();
        List<User> userapplylist = userRepository.findAllById(jobApply);
        return ResponseEntity.ok(userapplylist);
    }

    @DeleteMapping("/job/delete/{id}")
    public ResponseEntity deleteJob(@PathVariable Long id){
        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/job/recommended")
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
