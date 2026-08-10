package codylawdermilt.familydashboard.dto;

public class LoginResponse {

    private final String accessToken;
    private final String tokenType;
    private final long expiresIn;
    private final UserResponse user;

    public LoginResponse(
            String accessToken,
            long expiresIn,
            UserResponse user
    ) {
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.expiresIn = expiresIn;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public UserResponse getUser() {
        return user;
    }
}