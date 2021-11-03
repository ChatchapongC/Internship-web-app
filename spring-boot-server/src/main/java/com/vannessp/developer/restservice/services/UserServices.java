package com.vannessp.developer.restservice.services;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.Candidate.Resume.Education;
import com.vannessp.developer.restservice.model.Candidate.Resume.Resume;
import com.vannessp.developer.restservice.model.User.User;
import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.payload.request.UserProfileRequest;
import com.vannessp.developer.restservice.repository.CandidateRepository;
import com.vannessp.developer.restservice.repository.Resume.EducationRepository;
import com.vannessp.developer.restservice.repository.Resume.ResumeRepository;
import com.vannessp.developer.restservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
@RestController
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    EducationRepository educationRepository;

    public void updateResetPasswordToken(String token, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow( ()-> new BadRequestException("This Email : "+email+" is never sign up with us!"));
        user.setResetPasswordToken(token);
        userRepository.save(user);
    }

    public User getByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid token"));
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword((newPassword));
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

    public Candidate updateUserProfile(UserProfileRequest userProfileRequest, Candidate candidate){
        candidate.setFirstName(userProfileRequest.getFirstName());
        candidate.setLastName(userProfileRequest.getLastName());
        candidate.setFirstNameTH(userProfileRequest.getFirstNameTH());
        candidate.setLastNameTH(userProfileRequest.getLastNameTH());
        candidate.setMobileNumber(userProfileRequest.getMobileNumber());
        candidate.setGender(userProfileRequest.getGender());
        candidate.setDateOfBirth(userProfileRequest.getDateOfBirth());
        candidate.setAddress(userProfileRequest.getAddress());
        candidate.setNationality(userProfileRequest.getNationality());
        candidate.setReligion(userProfileRequest.getReligion());
        candidate.setAge(userProfileRequest.getAge());
        return candidateRepository.save(candidate);
    }

    public void createResumeDetails(Resume resume) {
        Set<Education> educationSet = new HashSet<>();
        Education newEducation = new Education();

        newEducation.setResume(resume);
        educationSet.add(newEducation);
        resume.setEducations(educationSet);

    }

}
