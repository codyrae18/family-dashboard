package codylawdermilt.familydashboard.service;

import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codylawdermilt.familydashboard.dto.LoginRequest;
import codylawdermilt.familydashboard.dto.LoginResponse;
import codylawdermilt.familydashboard.dto.RegisterRequest;
import codylawdermilt.familydashboard.dto.UserResponse;
import codylawdermilt.familydashboard.entity.User;
import codylawdermilt.familydashboard.exception.DuplicateEmailException;
import codylawdermilt.familydashboard.exception.InvalidCredentialsException;
import codylawdermilt.familydashboard.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String normalizedEmail = normalizeEmail(
                request.getEmail());

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new DuplicateEmailException(
                    "Email address already exists.");
        }

        String passwordHash = passwordEncoder.encode(
                request.getPassword());

        User user = new User(
                request.getFirstName().trim(),
                request.getLastName().trim(),
                normalizedEmail,
                passwordHash);

        User savedUser = userRepository.save(user);

        return convertToResponse(savedUser);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        String normalizedEmail = normalizeEmail(
                request.getEmail());

        User user = userRepository
                .findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException(
                        "Invalid email or password."));

        if (user.getPasswordHash() == null
                || !passwordEncoder.matches(
                        request.getPassword(),
                        user.getPasswordHash())) {
            throw new InvalidCredentialsException(
                    "Invalid email or password.");
        }

        String accessToken = jwtService.generateToken(user);

        UserResponse userResponse = convertToResponse(user);

        return new LoginResponse(
                accessToken,
                jwtService.getExpirationSeconds(),
                userResponse);
    }

    private String normalizeEmail(String email) {
        return email
                .trim()
                .toLowerCase(Locale.ROOT);
    }

    private UserResponse convertToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail());
    }
}