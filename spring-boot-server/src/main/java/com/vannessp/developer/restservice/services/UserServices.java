package com.vannessp.developer.restservice.services;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.model.User;
import com.vannessp.developer.restservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

@Service
@Transactional
@RestController
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void updateResetPasswordToken(String token, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow( ()-> new BadRequestException("This Email : "+email+" is never sign up with us!"));
        user.setResetPasswordToken(token);
        userRepository.save(user);
    }

    public User getByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new BadRequestException("Invvalid token"));
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword((newPassword));
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setResetPasswordToken(null);
        userRepository.save(user);
    }
}
