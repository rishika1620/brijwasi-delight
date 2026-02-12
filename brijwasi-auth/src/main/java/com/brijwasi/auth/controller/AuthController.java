package com.brijwasi.auth.controller;

import com.brijwasi.auth.dto.*;
import com.brijwasi.auth.model.User;
import com.brijwasi.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody User user) {
        try {
            var created = userService.register(user);
            return ResponseEntity.ok(ApiResponse.success(created, "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Registration failed: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        try {
            var token = userService.login(request);
            var user = userService.findByMobileNumber(request.getMobileNumber());
            var userDTO = UserDTO.fromUser(user);
            var authResponse = new AuthResponse(token, userDTO);
            return ResponseEntity.ok(ApiResponse.success(authResponse, "Login successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Login failed: " + e.getMessage(), 401));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<ForgotPasswordResponse>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            String resetToken = userService.forgotPassword(request);
            var response = new ForgotPasswordResponse("Password reset token generated. Check your email for reset link.", resetToken);
            return ResponseEntity.ok(ApiResponse.success(response, "Forgot password request processed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Forgot password failed: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(request);
            return ResponseEntity.ok(ApiResponse.success("Password reset successfully", "Your password has been reset. Please login with your new password."));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Password reset failed: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(@RequestBody ChangePasswordRequest request, Principal principal) {
        try {
            userService.changePassword(principal.getName(), request);
            return ResponseEntity.ok(ApiResponse.success("Password changed successfully", "Your password has been updated."));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Change password failed: " + e.getMessage(), 400));
        }
    }
}
