import { BaseEntity } from './common';

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  execStatus: boolean;
  httpStatus: number;
  status?: number;
  msg: string;
  customCode: string | null;
  data: {
    token: string;
    refreshToken: string;
    user_id: string;
    userName?: string;
    type?: 'admin' | 'user' | string;
  };
  // Legacy fields for backward compatibility
  success?: boolean;
  message?: string;
  authorization?: {
    type: 'bearer' | string;
    access_token: string;
    refresh_token: string;
    user_id: string;
  };
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  type: 'admin' | 'user';
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  authorization: {
    type: 'bearer' | string;
    access_token: string;
    refresh_token: string;
  };
  type?: 'admin' | 'user' | string;
}

export interface UserInfo extends User {
  // Additional user info fields if needed
}
