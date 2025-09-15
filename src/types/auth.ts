import { BaseEntity } from './common';

export interface User extends BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: number;
  approved_at: string | null;
  availability: string | null;
  email: string;
  cart_id: string | null;
  username: string | null;
  name: string | null;
  first_name: string;   
  last_name: string;
  password: string;
  domain: string | null;
  avatar: string | null;
  phone_number: string | null;
  country: string | null;
  state?: string | null;
  city: string | null;
  address: string | null;
  zip_code: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  billing_id?: string | null;
  type?: string | null;
  email_verified_at?: string | null;
  is_two_factor_enabled?: number;
  two_factor_secret?: string | null;
  role_users?: string[];
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
    user?: User;
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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: null;
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
