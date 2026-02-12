package com.brijwasi.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    // optional date of birth
    @Column(name = "dob")
    private LocalDate dob;

    // mandatory and unique mobile number
    @Column(name = "mobile_number", unique = true, nullable = false)
    private String mobileNumber;

    // optional email
    @Column(name = "email")
    private String email;

    // optional profile image URL/path
    @Column(name = "profile_url")
    private String profileUrl;

    // Password reset fields
    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<Role> roles;
}
