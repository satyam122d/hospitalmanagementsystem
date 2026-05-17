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
        Role role = roleRepo.findByRoleName("PATIENT")
                .orElseThrow(() -> new RuntimeException("Role PATIENT not found"));

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
}
