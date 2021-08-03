package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.Job;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.JobRespository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.security.CurrentUser;
import com.vannessp.developer.restservice.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRespository jobRepository;

    //get all users
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    //@PathVariable Long id is job id
    @PutMapping("/api/user/apply/{id}")
    public ResponseEntity applyjobtouser(@PathVariable Long id, @RequestBody User user){
        User currentUser = userRepository.findById(user.getId()).orElseThrow(RuntimeException::new);
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
        return ResponseEntity.ok(updateUser);
    }

    @GetMapping("/api/user/apply/list/{id}")
    public ResponseEntity showApplyList(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        List<Long> userApply = user.get().getApplyJob();
        List<Job> jobapplylist = jobRepository.findAllById(userApply);
        return ResponseEntity.ok(jobapplylist);
    }

}
