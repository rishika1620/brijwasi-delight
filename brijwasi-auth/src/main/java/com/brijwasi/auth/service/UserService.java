package com.brijwasi.auth.service;

import com.brijwasi.auth.dto.AuthRequest;
import com.brijwasi.auth.dto.ChangePasswordRequest;
import com.brijwasi.auth.dto.ForgotPasswordRequest;
import com.brijwasi.auth.dto.ResetPasswordRequest;
import com.brijwasi.auth.model.User;

public interface UserService {
    User register(User user);
    String login(AuthRequest request);
    String forgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);
    void changePassword(String username, ChangePasswordRequest request);
    User findByUsername(String username);
    User findByMobileNumber(String mobileNumber);
}
