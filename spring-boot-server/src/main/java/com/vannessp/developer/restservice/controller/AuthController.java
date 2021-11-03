package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.model.Candidate.Resume.Resume;
import com.vannessp.developer.restservice.model.Company.Company;
import com.vannessp.developer.restservice.model.User.AuthProvider;
import com.vannessp.developer.restservice.model.User.ERole;
import com.vannessp.developer.restservice.model.User.Role;
import com.vannessp.developer.restservice.model.User.User;
import com.vannessp.developer.restservice.payload.request.LoginRequest;
import com.vannessp.developer.restservice.payload.request.SignUpRequest;
import com.vannessp.developer.restservice.payload.response.ApiResponse;
import com.vannessp.developer.restservice.payload.response.AuthResponse;
import com.vannessp.developer.restservice.repository.CandidateRepository;
import com.vannessp.developer.restservice.repository.Resume.ResumeRepository;
import com.vannessp.developer.restservice.repository.RoleRepository;
import com.vannessp.developer.restservice.repository.UserRepository;
import com.vannessp.developer.restservice.security.TokenProvider;
import com.vannessp.developer.restservice.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    ResumeRepository resumeRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserServices userServices;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }
        Candidate candidate = new Candidate();

        Resume resume = new Resume();

        Date date = new Date();

        Company company = new Company();

        // Creating user's account
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);


        user.setPassword(passwordEncoder.encode(user.getPassword()));

        String strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();


        if (strRoles == null) {
           throw new BadRequestException("ROLE NOT SELECTED, PLEASE SELECT A ROLE");
        } else {
                switch (strRoles) {
                    case "CANDIDATE":
                        Role studentRole = roleRepository.findByName(ERole.ROLE_CANDIDATE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(studentRole);
                        user.setCandidate(candidate);
                        candidate.setUser(user);
                        candidate.setResume(resume);
                        resume.setCandidate(candidate);

                        break;
                    case "COMPANY":
                        Role companyRole = roleRepository.findByName(ERole.ROLE_COMPANY)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(companyRole);
                        user.setCompany(company);
                        company.setUser(user);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                };
        }

        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        user.setCreatedAt(date);
        user.setUpdatedAt(date);
        User result = userRepository.save(user);



        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }

}
