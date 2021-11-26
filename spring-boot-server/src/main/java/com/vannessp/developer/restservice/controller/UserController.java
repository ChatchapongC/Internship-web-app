package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.User.Role;
import com.vannessp.developer.restservice.model.User.User;
import com.vannessp.developer.restservice.payload.request.UpdateAccountRequest;
import com.vannessp.developer.restservice.payload.response.ApiResponse;
import com.vannessp.developer.restservice.repository.JobRepository;
import com.vannessp.developer.restservice.repository.RoleRepository;
import com.vannessp.developer.restservice.repository.CandidateRepository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.security.CurrentUser;
import com.vannessp.developer.restservice.security.UserPrincipal;
import com.vannessp.developer.restservice.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //get all users
    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/me/roles")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Set<Role> getRoles(@CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        return user.getRoles();
    }

    @PutMapping("/me/update")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> updateAccount(@CurrentUser UserPrincipal userPrincipal, @RequestBody UpdateAccountRequest updateAccountRequest) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        if (updateAccountRequest.getOldPassword() != null) {
            if (!passwordEncoder.matches(updateAccountRequest.getOldPassword(), user.getPassword())) {
                throw new BadRequestException("Invalid Old password");
            }
            else {
                if(updateAccountRequest.getNewPassword() == null){
                    throw new BadRequestException("Please input new password");
                } else {
                    String newPassword = passwordEncoder.encode(updateAccountRequest.getNewPassword());
                    user.setPassword(newPassword);
                }
            }
        }

        user.setEmail(updateAccountRequest.getNewEmail());
        userRepository.save(user);


        return ResponseEntity.ok().body(new ApiResponse(true, "Update Account Successfully"));
    }
}
