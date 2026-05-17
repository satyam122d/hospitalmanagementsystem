package com.smartcare.hms.controller;

import com.smartcare.hms.dto.LoginRequest;
import com.smartcare.hms.dto.LoginResponse;
import com.smartcare.hms.dto.RegisterRequest;
import com.smartcare.hms.entity.Doctor;
import com.smartcare.hms.repository.DoctorRepo;
import com.smartcare.hms.repository.UserRepo;
import com.smartcare.hms.service.AuthService;
import com.smartcare.hms.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerAndLogin(request));
    }
    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestParam String email
    ) {

        if (userRepo.findByEmail(email).isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Enter valid email");
        }

        String otp = authService.generateOtp(email);

        emailService.sendOtpEmail(email, otp);

        return ResponseEntity.ok("OTP sent successfully");
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword
    ) {

        String response =
                authService.resetPassword(email, otp, newPassword);

        if (response.equals("Password reset successful")) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }
    @RestController
    @RequestMapping("/doctors")
    @CrossOrigin(origins = "http://localhost:5173")
    public class DoctorController {

        @Autowired
        private DoctorRepo doctorRepo;

        @GetMapping
        public List<Doctor> getAllDoctors() {
            return doctorRepo.findAll();
        }
    }}
