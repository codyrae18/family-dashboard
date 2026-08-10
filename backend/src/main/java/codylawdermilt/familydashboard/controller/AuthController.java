package codylawdermilt.familydashboard.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codylawdermilt.familydashboard.dto.LoginRequest;
import codylawdermilt.familydashboard.dto.RegisterRequest;
import codylawdermilt.familydashboard.dto.UserResponse;
import codylawdermilt.familydashboard.service.AuthService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request) {
        UserResponse registeredUser = authService.register(request);

        URI location = URI.create(
                "/api/users/" + registeredUser.getId());

        return ResponseEntity
                .created(location)
                .body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(
            @Valid @RequestBody LoginRequest request) {
        UserResponse authenticatedUser = authService.login(request);

        return ResponseEntity.ok(authenticatedUser);
    }
}