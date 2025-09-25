package com.levelup.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

public class JwtUtil {

    private static final String SECRET_KEY = "levelUpFinanceAppSecretKey2024SpringBootReact";
    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public static Claims decodeJwt(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token: " + e.getMessage());
        }
    }

    public static Long getUserIdFromToken(String token) {
        try {
            Claims claims = decodeJwt(token);
            Long userId = claims.get("userId", Long.class);
            if (userId == null) {
                userId = claims.get("id", Long.class);
            }
            return userId;
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract user ID from token: " + e.getMessage());
        }
    }

    public static String createJWTToken(Long userId, String username) {
        return Jwts.builder()
            .claim("userId", userId)
            .claim("sub", username)
            .signWith(KEY)
            .compact();
    }
}

