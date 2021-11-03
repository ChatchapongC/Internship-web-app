package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Candidate.JobApplication;
import com.vannessp.developer.restservice.model.Company.Company;
import com.vannessp.developer.restservice.model.Company.Job;
import com.vannessp.developer.restservice.model.User.User;
import com.vannessp.developer.restservice.payload.request.CompanyProfileRequest;
import com.vannessp.developer.restservice.payload.request.JobRequest;
import com.vannessp.developer.restservice.payload.response.ApiResponse;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.JobApplicationRepository;
import com.vannessp.developer.restservice.repository.JobRepository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.security.CurrentUser;
import com.vannessp.developer.restservice.security.UserPrincipal;
import com.vannessp.developer.restservice.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.ResultSet;
import java.util.*;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserServices userServices;

    @GetMapping("/all")
    public List<Company> getAllCompany(){
        return companyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCompanyById(@Valid @PathVariable Long id){
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", id));

        return ResponseEntity.ok(company);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<Company> getCompany(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        Company company = user.getCompany();
        return ResponseEntity.ok(company);
    }

    @PutMapping("/profile/update")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> updateCompany(@Valid @RequestBody CompanyProfileRequest companyProfileRequest, @CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        Company company = user.getCompany();
        company.setCompanyName(companyProfileRequest.getCompanyName());
        company.setAddress(companyProfileRequest.getAddress());
        company.setTypeOfBusiness(companyProfileRequest.getTypeOfBusiness());
        company.setTelephoneNumber(companyProfileRequest.getTelephoneNumber());
        company.setContactEmail(companyProfileRequest.getContactEmail());
        companyRepository.save(company);
        user.setCompany(company);
        return ResponseEntity.ok(company);
    }

    @PostMapping("/create-job")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobRequest jobRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Company company = user.getCompany();

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Europe/Madrid"));
        Date date = calendar.getTime();

        Job job = new Job();
        job.setTitle(jobRequest.getTitle());
        job.setType(jobRequest.getType());
        job.setCategory(jobRequest.getCategory());
        job.setAvailablePosition(jobRequest.getAvailablePosition());
        job.setAllowance(jobRequest.getAllowance());
        job.setWorkingTime(jobRequest.getWorkingTime());
        job.setWorkingHoliday(jobRequest.getWorkingHoliday());
        job.setLocation(jobRequest.getLocation());
        job.setDescription(jobRequest.getDescription());
        job.setContactNumber(jobRequest.getContactNumber());
        job.setContactPersonName(jobRequest.getContactPersonName());
        job.setCompany(company);
        job.setCreatedAt(date);
        job.setUpdatedAt(date);
        Job newJob = jobRepository.save(job);

        return ResponseEntity.ok(newJob);
    }

    @PutMapping("/job/{id}/edit")
    public ResponseEntity<?> updateJob(@Valid @PathVariable Long id, @RequestBody JobRequest jobRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Company company = user.getCompany();

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Europe/Madrid"));
        Date date = calendar.getTime();

        Job job = jobRepository.findByIdAndCompanyId(id, company.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Job", "id", userPrincipal.getId()));

        job.setTitle(jobRequest.getTitle());
        job.setType(jobRequest.getType());
        job.setCategory(jobRequest.getCategory());
        job.setAvailablePosition(jobRequest.getAvailablePosition());
        job.setAllowance(jobRequest.getAllowance());
        job.setWorkingTime(jobRequest.getWorkingTime());
        job.setWorkingHoliday(jobRequest.getWorkingHoliday());
        job.setLocation(jobRequest.getLocation());
        job.setDescription(jobRequest.getDescription());
        job.setContactNumber(jobRequest.getContactNumber());
        job.setContactPersonName(jobRequest.getContactPersonName());
        job.setCompany(company);
        job.setUpdatedAt(date);

        Job updatedJob = jobRepository.save(job);

        return ResponseEntity.ok(updatedJob);
    }

    @GetMapping("/jobs")
    public ResponseEntity<?> getCompanyJobs(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        Company company = user.getCompany();
        Long companyId = company.getId();

        List<Job> jobs = jobRepository.findByCompanyId(companyId);

        return ResponseEntity.ok(jobs);
    }

    @DeleteMapping("/job/{id}/delete")
    public ResponseEntity<?> deleteJob(@PathVariable Long id, @CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        Company company = user.getCompany();
        Long companyId = company.getId();

        return jobRepository.findByIdAndCompanyId(id, companyId).map(job -> {
            jobRepository.delete(job);
            return ResponseEntity.ok().body(new ApiResponse(true, "Delete job "+id+" successfully"));
        }).orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));

    }

    @GetMapping("/job/{id}/candidates")
    public ResponseEntity<?> listAppliedCandidate(@PathVariable Long id, @CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        Company company = user.getCompany();
        Long companyId = company.getId();

        Job job = jobRepository.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));

        List<JobApplication> jobApplication = jobApplicationRepository.findByJob(job);

        List<Candidate> candidates = new ArrayList<>();

        jobApplication.forEach((j) -> candidates.add(j.getCandidate()));

        return ResponseEntity.ok(candidates);

    }

    @PutMapping("/update-status/viewed/candidate/{cId}/{jId}")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> updateViewedStatus(@PathVariable Long cId, @PathVariable Long jId) {

        JobApplication jobApplication = jobApplicationRepository.findByCandidateIdAndJobId(cId, jId)
                .orElseThrow(() -> new BadRequestException("Job application error"));

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Europe/Madrid"));
        Date date = calendar.getTime();
        String status = jobApplication.getStatus();

        if (status == null) {
            jobApplication.setViewDate(date);
            jobApplication.setStatus("viewed");
            jobApplicationRepository.save(jobApplication);
        }

        else if (status.equalsIgnoreCase("pass") || status.equalsIgnoreCase("decline")){
            return ResponseEntity.ok().body(new ApiResponse(false, "Viewed"));
        }

        return ResponseEntity.ok().body(new ApiResponse(true, "Viewed resume, send notification to candidate"));
    }

    @PutMapping("/update-status/pass/candidate/{cId}/{jId}")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> updatePassStatus(@PathVariable Long cId, @PathVariable Long jId) {
        JobApplication jobApplication = jobApplicationRepository.findByCandidateIdAndJobId(cId, jId)
                .orElseThrow(() -> new BadRequestException("Job application error"));

        jobApplication.setStatus("pass");
        jobApplicationRepository.save(jobApplication);
        return ResponseEntity.ok().body(new ApiResponse(true, "Pass, send notification to candidate"));
    }

    @PutMapping("/update-status/decline/candidate/{cId}/{jId}")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> updateDeclineStatus(@PathVariable Long cId, @PathVariable Long jId) {
        JobApplication jobApplication = jobApplicationRepository.findByCandidateIdAndJobId(cId, jId)
                .orElseThrow(() -> new BadRequestException("Job application error"));

        jobApplication.setStatus("decline");
        jobApplicationRepository.save(jobApplication);
        return ResponseEntity.ok().body(new ApiResponse(true, "Decline, send notification to candidate"));
    }

//    @PutMapping("/business/addjob/{id}")
//    public ResponseEntity<Company> addjobtobusiness(@PathVariable Long id, @RequestBody Company company){
//        Company currentCompany = companyRepository.findById(company.getId()).orElseThrow(RuntimeException::new);
//        List<Long> list = currentCompany.getJobs_list();
//        list.add(id);
//        currentCompany.setJobs_list(list);
//        companyRepository.save(currentCompany);
//        return ResponseEntity.ok(currentCompany);
//    }
//    //@PathVariable Long id is job id that you want to delete in business
//    @PutMapping("/business/deletejob/{id}")
//    public ResponseEntity<Company> deletejobinlist(@PathVariable Long id, @RequestBody Company company){
//        Company currentCompany = companyRepository.findById(company.getId()).orElseThrow(RuntimeException::new);
//        List<Long> job_list = currentCompany.getJobs_list();
//        int index = 999999;
//        for (int i=0 ; i<job_list.size() ; i++)
//        {
//            if (job_list.get(i).equals(id)){
//                index = i;
//            }
//        }
//        if (index == 999999)
//        {
//            return null;
//        }
//        job_list.remove(index);
//        currentCompany.setJobs_list(job_list);
//        companyRepository.save(currentCompany);
//        return ResponseEntity.ok(currentCompany);
//    }

    //Get job of that business
    //Ex. Business 1 have job no.1 then put id of business in the path url after that it will show job no.1
//    @GetMapping("/business/{id}/jobs")
//    public ResponseEntity<List<Job>> getJobOfBusiness(@PathVariable Long id){
//        List<Long> jobidlist = companyRepository.findById(id).get().getJobs_list();
//        List<Job> job = jobRepository.findAllById(jobidlist);
//        return ResponseEntity.ok(job);
//    }
//
//    @GetMapping("/business/all")
//    public ResponseEntity<List<Company>> getBusiness(){
//        List<Company> allCompanies = companyRepository.findAll();
//        return ResponseEntity.ok(allCompanies);
//    }
//
//    @DeleteMapping("/business/delete/{id}")
//    public ResponseEntity deletebusiness(@PathVariable Long id){
//        companyRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }
}
