/**
 * User model
 */
export interface User {
  id: number;
  username: string;
  email: string;
  mobileNumber: string;
  phoneNumber?: string;
  profileUrl?: string;
  profileImageUrl?: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Authentication credentials for login
 */
export interface LoginRequest {
  mobileNumber: string;
  password: string;
}

/**
 * Registration credentials
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

/**
 * Authentication token response
 */
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn?: number;
}

/**
 * JWT Token payload
 */
export interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}
/**
 * Forgot password request
 */
export interface ForgotPasswordRequest {
  mobileNumber: string;
}

/**
 * Forgot password response
 */
export interface ForgotPasswordResponse {
  message: string;
  resetToken: string;
}

/**
 * Reset password request
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}