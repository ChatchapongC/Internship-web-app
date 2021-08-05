package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Company;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.repository.CompanyRepository;
import com.vannessp.developer.restservice.repository.JobRespository;
import com.vannessp.developer.restservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CompanyController {

    @Autowired
    private JobRespository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    //Just for test case
    @GetMapping("/business/test")
    public ResponseEntity<Company> initialBusinessTest(){

        Company company = new Company();

        //Sample Testcase

////        company.setId(1L);
//        company.setName("business1");
//        company.setType("business1_type");
//        company.setContact_number("023456789");
//        company.setEmail("business1@mail.com");


        //TestCase for add job id to business

//        Company company = companyRepository.findById(2L).get();
//        Job j = jobRepository.findById(11L).get();
//        List<Long> list = company.getJobs_list();
//        list.add(j.getId());
//        company.setJobs_list(list);


        companyRepository.save(company);
        return ResponseEntity.ok(company);
    }

    @GetMapping("/business/{id}")
    public ResponseEntity<Company> getBusinessById(@PathVariable Long id){
        Company company = companyRepository.findById(id).orElseThrow(() -> new BadRequestException("Error bussiness is not found!!"));
        return ResponseEntity.ok(company);
    }

    @PutMapping("/business/addjob/{id}")
    public ResponseEntity<Company> addjobtobusiness(@PathVariable Long id, @RequestBody Company company){
        Company currentCompany = companyRepository.findById(company.getId()).orElseThrow(RuntimeException::new);
        List<Long> list = currentCompany.getJobs_list();
        list.add(id);
        currentCompany.setJobs_list(list);
        companyRepository.save(currentCompany);
        return ResponseEntity.ok(currentCompany);
    }

    @PutMapping("/business/editv1/{id}")
    public ResponseEntity<Company>  editBusinessById(@PathVariable Long id, @RequestBody Company company){
        Company currentCompany = companyRepository.findById(id).orElseThrow(RuntimeException::new);
        currentCompany.setName(company.getName());
        currentCompany.setType(company.getType());
        currentCompany.setContact_number(company.getContact_number());
        currentCompany.setLogo(company.getLogo());
        currentCompany.setJobs_list(company.getJobs_list());
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
        currentCompany.setJobs_list(company.getJobs_list());
        currentCompany.setEmail(company.getEmail());
        companyRepository.save(currentCompany);
        return ResponseEntity.ok(currentCompany);
    }

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
        companyRepository.save(currentCompany);
        return ResponseEntity.ok(currentCompany);
    }

    //Get job of that business
    //Ex. Business 1 have job no.1 then put id of business in the path url after that it will show job no.1
    @GetMapping("/business/{id}/jobs")
    public ResponseEntity<List<Job>> getJobOfBusiness(@PathVariable Long id){
        List<Long> jobidlist = companyRepository.findById(id).get().getJobs_list();
        List<Job> job = jobRepository.findAllById(jobidlist);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/business/all")
    public ResponseEntity<List<Company>> getBusiness(){
        List<Company> allCompanies = companyRepository.findAll();
        return ResponseEntity.ok(allCompanies);
    }

    @DeleteMapping("/business/delete/{id}")
    public ResponseEntity deletebusiness(@PathVariable Long id){
        companyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
