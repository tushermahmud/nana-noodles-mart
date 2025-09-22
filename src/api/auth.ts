import { BASE_URL } from '@/config/env';

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  GET_CURRENT_USER: `${BASE_URL}/auth/me`,
  UPDATE_PROFILE: `${BASE_URL}/auth/update`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  VERIFY_EMAIL: `${BASE_URL}/auth/verify-email`,
  RESEND_VERIFICATION: `${BASE_URL}/auth/resend-verification`,
};
