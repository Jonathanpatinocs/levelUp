package com.levelup.backend.controller;

import com.levelup.backend.model.User;
import com.levelup.backend.model.DTO.LoginRequest;
import com.levelup.backend.model.DTO.AuthResponse;
import com.levelup.backend.repository.UserRepository;
import com.levelup.backend.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) {

        // Check if username or email exists
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        if (userRepository.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email invalid or already exists"));
        }

        // Hash password
        request.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(request);


        // create JWT token for auto login after sign up
        String token = JwtUtil.createJWTToken(savedUser.getId(), savedUser.getUsername());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    //Login

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        // Create JWT
        String token = JwtUtil.createJWTToken(user.getId(), user.getUsername());

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
