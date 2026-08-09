package codylawdermilt.familydashboard.service;
import codylawdermilt.familydashboard.repository.UserRepository;
import org.springframework.stereotype.Service;

import codylawdermilt.familydashboard.dto.CreateUserRequest;
import codylawdermilt.familydashboard.dto.UserResponse;
import codylawdermilt.familydashboard.entity.User;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
    return userRepository.findAll()
            .stream()
            .map(user -> new UserResponse(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail()
            ))
            .toList();
}

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

   public UserResponse createUser(CreateUserRequest request) {

    User user = new User(
    request.getFirstName(),
    request.getLastName(),
    request.getEmail(),
    "TEMP_PASSWORD"
    );

    User savedUser = userRepository.save(user);

    return new UserResponse(
            savedUser.getId(),
            savedUser.getFirstName(),
            savedUser.getLastName(),
            savedUser.getEmail()
    );
}

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(updatedUser.getFirstName());
                    user.setLastName(updatedUser.getLastName());
                    user.setEmail(updatedUser.getEmail());

                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}