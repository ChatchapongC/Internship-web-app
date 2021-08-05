package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.Company;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.JobRespository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.security.CurrentUser;
import com.vannessp.developer.restservice.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    //---------------------------------- Respository Zone -----------------------------------//

    //Job Repository
    @Autowired
    private JobRespository jobRepository;

    //Company Repository
    @Autowired
    private CompanyRepository companyRepository;

    //User Repository
    @Autowired
    private UserRepository userRepository;

    //---------------------------------------------------------------------------------------//

    //---------------------------------- Find by id -----------------------------------//

    @GetMapping("/job/{id}")
    public ResponseEntity<Job> getJobbyId(@PathVariable Long id){
        Job job = jobRepository.findById(id).orElseThrow(()-> new BadRequestException("Error job not found"));
        return ResponseEntity.ok(job);
    }

    @GetMapping("/business/{id}")
    public ResponseEntity<Company> getBusinessById(@PathVariable Long id){
        Company company = companyRepository.findById(id).orElseThrow(() -> new BadRequestException("Error bussiness is not found!!"));
        return ResponseEntity.ok(company);
    }

    //---------------------------------------------------------------------------------------//

    //---------------------------------- Find All -----------------------------------//

    @GetMapping("/job/all")
    public ResponseEntity<List<Job>> getAllJob(){
        List<Job> allJob = jobRepository.findAll();
        return ResponseEntity.ok(allJob);
    }

    @GetMapping("/business/all")
    public ResponseEntity<List<Company>> getBusiness(){
        List<Company> allCompanies = companyRepository.findAll();
        return ResponseEntity.ok(allCompanies);
    }

    //get all users
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    //---------------------------------------------------------------------------------------//

    //---------------------------------- Custom Search -----------------------------------//

    //without order list
    @GetMapping("/job/bus_name/{business_name}")
    public ResponseEntity<List<Job>> getJobByBusinessName(@PathVariable String business_name){
        List<Job> job = jobRepository.findByBusiness_name(business_name);
        return ResponseEntity.ok(job);
    }

    //with order list
    @GetMapping("/job/startwith/{keyword}")
    public ResponseEntity<List<Job>> getJobbyFirstCharacter(@PathVariable String keyword){
        //String keyword = "b";
        List<Job> job = jobRepository.findWithfirstCharacter(keyword);
        return ResponseEntity.ok(job);
    }

    //Get job of that business
    //Ex. Business 1 have job no.1 then put id of business in the path url after that it will show job no.1
    @GetMapping("/business/{id}/jobs")
    public ResponseEntity<List<Job>> getJobOfBusiness(@PathVariable Long id){
        List<Long> jobidlist = companyRepository.findById(id).get().getJobs_list();
        List<Job> job = jobRepository.findAllById(jobidlist);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/job/recommended")
    public ResponseEntity<List<Job>> getRecommendJob(){
        List<Job> job = jobRepository.findByRecommend();
        return ResponseEntity.ok(job);
    }

    @GetMapping("/job/apply/list/{id}")
    public ResponseEntity showApplyList(@PathVariable Long id){
        Optional<Job> user = jobRepository.findById(id);
        List<Long> jobApply = user.get().getUser_apply();
        List<User> userapplylist = userRepository.findAllById(jobApply);
        return ResponseEntity.ok(userapplylist);
    }


    //---------------------------------------------------------------------------------------//

    //---------------------------------- Edit Data -----------------------------------//

    @PutMapping("/business/addjob/{id}")
    public ResponseEntity<Company> addjobtobusiness(@PathVariable Long id, @RequestBody Company company){
        Company currentCompany = companyRepository.findById(company.getId()).orElseThrow(RuntimeException::new);
        List<Long> list = currentCompany.getJobs_list();
        list.add(id);
        currentCompany.setJobs_list(list);
        companyRepository.save(currentCompany);

        Job job = jobRepository.findById(id).get();

        return ResponseEntity.ok(currentCompany);
    }

    @PutMapping("/business/editv1/{id}")
    public ResponseEntity<Company>  editBusinessById(@PathVariable Long id, @RequestBody Company company){
        Company currentCompany = companyRepository.findById(id).orElseThrow(RuntimeException::new);
        currentCompany.setName(company.getName());
        currentCompany.setType(company.getType());
        currentCompany.setContact_number(company.getContact_number());
        currentCompany.setLogo(company.getLogo());
//        currentCompany.setJobs_list(company.getJobs_list());
        currentCompany.setEmail(company.getEmail());
        companyRepository.save(currentCompany);
        return ResponseEntity.ok(currentCompany);
    }

    @PutMapping("/business/editv2/{id}")
    public ResponseEntity<Company>  editBusinessByCompany(@RequestBody Company company){
        Company currentCompany = companyRepository.findById(company.getId()).orElseThrow(RuntimeException::new);
        currentCompany.setName(company.getName());
        currentCompany.setType(company.getType());
        currentCompany.setContact_number(company.getContact_number());
        currentCompany.setLogo(company.getLogo());
//        currentCompany.setJobs_list(company.getJobs_list());
        currentCompany.setEmail(company.getEmail());
        companyRepository.save(currentCompany);
        return ResponseEntity.ok(currentCompany);
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

//    //@PathVariable Long id is user id
//    @PutMapping("/job/apply/{id}")
//    public ResponseEntity applyJob(@PathVariable Long id, @RequestBody Job job){
//        Job currentJob = jobRepository.findById(job.getId()).orElseThrow(RuntimeException::new);
//        List<Long> userApply = currentJob.getUser_apply();
//        userApply.add(id);
//        currentJob.setUser_apply(userApply);
//        jobRepository.save(currentJob);
//        User currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);
//        List<Long> userApply2 = currentUser.getApplyJob();
//        userApply2.add(id);
//        return ResponseEntity.ok(currentJob);
//    }

    //@PathVariable Long id is job id
    @PutMapping("/api/user/apply/{id}")
    public ResponseEntity applyjobtouser(@PathVariable Long id, @CurrentUser UserPrincipal userPrincipal){
        User currentUser = userRepository.findById(userPrincipal.getId()).orElseThrow(RuntimeException::new);
        List<Long> userApply = currentUser.getApplyJob();
        userApply.add(id);
//        if(userApply == null || userApply == "")
////        if (userApply.isEmpty())
//        {
//            userApply = id.toString();
//        }
//        else
//        {
//            userApply.concat(","+id.toString());
//        }
        currentUser.setApplyJob(userApply);
        final User updateUser = userRepository.save(currentUser);

        Job currentJob = jobRepository.findById(id).orElseThrow(RuntimeException::new);
        List<Long> userApply2 = currentJob.getUser_apply();
        userApply2.add(id);
        currentJob.setUser_apply(userApply2);
        jobRepository.save(currentJob);
        return ResponseEntity.ok(updateUser);
    }

    //---------------------------------------------------------------------------------------//

    //---------------------------------- Delete Zone -----------------------------------//

    //@PathVariable Long id is job id that you want to delete in business
    @PutMapping("/business/deletejob/{id}")
    public ResponseEntity<Company> deletejobinlist(@PathVariable Long id, @RequestBody Company company){
        Company currentCompany = companyRepository.findById(company.getId()).orElseThrow(RuntimeException::new);
        List<Long> job_list = currentCompany.getJobs_list();
        int index = 999999;
        for (int i=0 ; i<job_list.size() ; i++)
        {
            if (job_list.get(i).equals(id)){
                index = i;
            }
        }
        if (index == 999999)
        {
            return null;
        }
        job_list.remove(index);
        currentCompany.setJobs_list(job_list);
        Long job_id = Long.parseLong(String.valueOf(index));
        jobRepository.deleteById(job_id);
        companyRepository.save(currentCompany);
        return ResponseEntity.ok(currentCompany);
    }

    //Same idea with deletejobinlist()

//    @DeleteMapping("/job/delete/{id}")
//    public ResponseEntity deleteJob(@PathVariable Long id){
//        jobRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }

    @DeleteMapping("/business/delete/{id}")
    public ResponseEntity deletebusiness(@PathVariable Long id){
        companyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    //---------------------------------------------------------------------------------------//
}
