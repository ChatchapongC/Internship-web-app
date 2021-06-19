package com.vannessp.developer.restservice.services;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.payload.request.ForgotPasswordRequest;
import com.vannessp.developer.restservice.payload.request.SignUpRequest;
import com.vannessp.developer.restservice.payload.response.MessageResponse;
import com.vannessp.developer.restservice.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
public class ForgotPasswordController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserServices userServices;

    @Autowired
    private UserRepository userRepository;

    public void sendEmail(String email, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("vpinternshipproject@gmail.com");
        helper.setTo(email);

        String subject = "Reset Password from VPInternship";

        String content = "<p>Hello, </p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";
        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<?> processForgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        if(!userRepository.existsByEmail(forgotPasswordRequest.getEmail())) {
            throw new BadRequestException("This Email address is never sign up with us!.");
        }
        String email = forgotPasswordRequest.getEmail();
        String token = RandomString.make(30);
        try {
            userServices.updateResetPasswordToken(token, email);
            String resetPasswordLink = "http://localhost:3000/resetpassword?token="+token;
            sendEmail(email, resetPasswordLink);
            System.out.println("sent");
        }catch (UsernameNotFoundException | UnsupportedEncodingException | MessagingException ex){
            ex.getMessage();
        }
        return ResponseEntity.ok(new MessageResponse("Email has already send to your email"));
    }

}
