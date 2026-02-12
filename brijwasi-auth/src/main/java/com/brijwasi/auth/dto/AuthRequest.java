package com.brijwasi.auth.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String mobileNumber;
    private String password;
}
