package com.levelup.backend.model.DTO;

public class UserProfileLimitedViewDTO {
    private long id;
    private String username;
    private String email;

    public UserProfileLimitedViewDTO(long id, String username, String email){
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
}
