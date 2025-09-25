package com.levelup.backend.controller;

import com.levelup.backend.model.DTO.UserProfileLimitedViewDTO;
import com.levelup.backend.model.User;
import com.levelup.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.levelup.backend.config.JwtUtil;


import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/test-token/{userId}")
    public String createTestToken(@PathVariable Long userId) {
        // Create a real JWT token for testing
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return JwtUtil.createJWTToken(user.getId(), user.getUsername());
    }

    @GetMapping("/users/me")
    ResponseEntity<UserProfileLimitedViewDTO> getUserInfo(@RequestHeader("Authorization") String authHeader){
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")){
                return ResponseEntity.status(401).body(null);
            }

            //TODO: Confer with Jacqueline about JWT payload to know what expected - may need to update but logic should be sound
            String jwtToken = authHeader.substring(7);
            long id = JwtUtil.getUserIdFromToken(jwtToken);

            User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));

            if (user != null){
                UserProfileLimitedViewDTO userProfileInformation = new UserProfileLimitedViewDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail()
                );
                return ResponseEntity.ok(userProfileInformation);
            } else return ResponseEntity.status(401).build();
        } catch (RuntimeException e) {
            // User not found or JWT validation failed
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.status(404).build();
            } else {
                return ResponseEntity.status(401).build(); // JWT invalid
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
