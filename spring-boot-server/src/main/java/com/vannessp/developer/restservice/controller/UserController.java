package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.security.CurrentUser;
import com.vannessp.developer.restservice.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //get all users
    @GetMapping("/users/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/users")
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
}
