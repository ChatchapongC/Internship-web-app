package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.model.Business;
import com.vannessp.developer.restservice.repository.BusinessRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BusinessController {

    @Autowired
    private BusinessRespository businessRespository;

    //Just for test case
    @GetMapping("/business/test")
    public ResponseEntity<Business> initialBusinessTest(){
        Business business = new Business();
        business.setId(1L);
        business.setName("business1");
        business.setType("business1_type");
        business.setContact_number("023456789");
        business.setEmail("business1@mail.com");
        businessRespository.save(business);
        return ResponseEntity.ok(business);
    }

    @GetMapping("/business/all")
    public ResponseEntity<List<Business>> getBusiness(){
        List<Business> allBusiness = businessRespository.findAll();
        return ResponseEntity.ok(allBusiness);
    }
}
