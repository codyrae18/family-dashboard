package codylawdermilt.familydashboard.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class LoginResponse {

    @JsonIgnore
    private String token;

    private long expiresIn;

    private UserResponse user;

    public LoginResponse(
            String token,
            long expiresIn,
            UserResponse user) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public UserResponse getUser() {
        return user;
    }
}