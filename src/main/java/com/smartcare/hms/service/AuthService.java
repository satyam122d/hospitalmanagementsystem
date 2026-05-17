package com.smartcare.hms.service;

import com.smartcare.hms.dto.LoginRequest;
import com.smartcare.hms.dto.LoginResponse;
import com.smartcare.hms.dto.RegisterRequest;
import com.smartcare.hms.entity.Role;
import com.smartcare.hms.entity.User;
import com.smartcare.hms.repository.RoleRepo;
import com.smartcare.hms.repository.UserRepo;
import com.smartcare.hms.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepo userRepo,
                       RoleRepo roleRepo,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    @Transactional
    public LoginResponse registerAndLogin(RegisterRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (!isValidPassword(request.getPassword())) {
            throw new RuntimeException(
                    "Password does not meet requirements"
            );
        }
        Role role = roleRepo.findByRoleName("PATIENT")
                .orElseThrow(() -> new RuntimeException("User doesnot exist"));

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setRole(role);

        userRepo.save(user);

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getRoleName()
        );

        return new LoginResponse(token);

    }
    public LoginResponse login(LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getRoleName()
        );

        return new LoginResponse(token);
    }
    private final Map<String, OtpData> otpStorage = new HashMap<>();
    public String generateOtp(String email) {

        Random random = new Random();

        String otp = String.format("%06d", random.nextInt(999999));

        otpStorage.put(
                email,
                new OtpData(otp, System.currentTimeMillis())
        );
        return otp;
    }
    public boolean verifyOtp(String email, String otp) {

        return otp.equals(otpStorage.get(email));
    }
    public void clearOtp(String email) {

        otpStorage.remove(email);
    }
    public String resetPassword(String email, String otp, String newPassword) {
        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            return "Enter valid email";
        }

        if (userRepo.findByEmail(email).isEmpty()) {
            return "Email not found";
        }

        if (!otp.matches("\\d{6}")) {
            return "Enter valid OTP";
        }

        if (!otpStorage.containsKey(email)) {
            return "OTP not found";
        }

        OtpData otpData = otpStorage.get(email);

        long currentTime = System.currentTimeMillis();

        long otpTime = otpData.getCreatedTime();

        if ((currentTime - otpTime) > 5 * 60 * 1000) {

            otpStorage.remove(email);

            return "OTP expired. Please request a new OTP";
        }
        String storedOtp = otpData.getOtp();

        if (!storedOtp.equals(otp)) {
            return "Invalid OTP";
        }

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            return "New password cannot be same as old password";
        }
        if (!isValidPassword(newPassword)) {
            return "Password does not meet requirements";
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepo.save(user);

        otpStorage.remove(email);

        return "Password reset successful";
    }
    private boolean isValidPassword(String password) {

        String passwordRegex =
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,}$";

        return password.matches(passwordRegex);
    }
}
