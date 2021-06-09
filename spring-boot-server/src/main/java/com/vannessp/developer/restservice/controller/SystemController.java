package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.model.UserStudent;
import com.vannessp.developer.restservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class SystemController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup") // Map ONLY POST Requests
    @ResponseBody
    public String signupuser (@RequestParam String id, @RequestParam String password, @RequestParam String firstname, @RequestParam String lastname, @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        UserStudent user = new UserStudent();
        user.setId(id);
        user.setPassword(password);
        user.setFirstName(firstname);
        user.setLastName(lastname);
        user.setUserEmail(email);
        userRepository.save(user);
        return user.toString();
    }

    @GetMapping("/login") // Map ONLY POST Requests
    @ResponseBody
    public String loginuser (@RequestParam String id, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        UserStudent user = userRepository.getOne(id);

        if(user == null)
        {
            return "User does not exist";
        }
        else if(user.getPassword().equals(password))
        {
            return "login success";
        }
        else
        {
            return "Password is not correct";
        }
    }
}
