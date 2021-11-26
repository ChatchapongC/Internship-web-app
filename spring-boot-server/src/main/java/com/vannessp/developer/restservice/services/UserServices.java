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
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
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

    @Autowired
    private JavaMailSender mailSender;

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
        candidate.setHeight(userProfileRequest.getHeight());
        candidate.setWeight(userProfileRequest.getWeight());
        candidate.setTypeOfWork(userProfileRequest.getTypeOfWork());
        return candidateRepository.save(candidate);
    }

    public void sendVerificationEmail(User user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "noreply.intrendship@gmail.com";
        String senderName = "Intrendship";
        String subject = "Please verify your registration";
        String content = "Dear User,<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Intrendship.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        String verifyURL = "https://intrendship.web.app" + "/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode)
                .orElseThrow(() -> new BadRequestException("Invalid code"));

        if(user == null || user.getEmailVerified()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEmailVerified(true);
            userRepository.save(user);
            return true;
        }
    }

}
