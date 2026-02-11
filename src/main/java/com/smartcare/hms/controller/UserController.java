package com.smartcare.hms.controller;

import com.smartcare.hms.entity.User;
import com.smartcare.hms.repository.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.smartcare.hms.dto.ProfileRequest;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepo userRepo;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {

        String email = authentication.getName();

        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/me")
    public User updateProfile(
            Authentication authentication,
            @RequestBody ProfileRequest request
    ) {
        String email = authentication.getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setPhone(request.getPhone());

        return userRepo.save(user);
    }

}
