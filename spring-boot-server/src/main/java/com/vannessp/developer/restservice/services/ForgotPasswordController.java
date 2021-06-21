package com.vannessp.developer.restservice.services;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.payload.request.ForgotPasswordRequest;
import com.vannessp.developer.restservice.payload.request.ResetPasswordRequest;
import com.vannessp.developer.restservice.payload.response.ApiResponse;
import com.vannessp.developer.restservice.payload.response.MessageResponse;
import com.vannessp.developer.restservice.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

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

        String content =
                 "<style>"
                +".button { border: none; color: white; padding: 12px 32px;"
                +" text-align: center; text-decoration: none; display: inline-block;"
                +"  font-size: 16px; margin: 4px 2px; transition-duration: 0.4s; cursor: pointer; }"

                +".button1 { background-color: #473c8b; color: white; }"

                +".button1:hover { background-color: #836fff; color: white; }"

                +"</style>"
                +"</head>"
                +"<body>"

                +"<p>Hello, </p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<br>"
                + "<a class=\"button button1\" href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>"
                +"</body>";
        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<?> processForgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        if(!userRepository.existsByEmail(forgotPasswordRequest.getEmail())) {
            throw new BadRequestException("This Email address is never sign up with us!");
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

    @RequestMapping(value = "resetpassword", method = RequestMethod.PUT)
    public ResponseEntity<?> processResetPassword(@Valid @RequestParam("token") String token, @RequestBody ResetPasswordRequest resetPasswordRequest) {
        if(!userRepository.existsByResetPasswordToken(token)){
            throw new BadRequestException("Invalid token");
        }
        String newPassword = resetPasswordRequest.getNewPassword();
        User user = userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid token"));
        userServices.updatePassword(user,newPassword);

        return ResponseEntity.ok(new ApiResponse(true,"You have successfully changed your password."));
    }

}
