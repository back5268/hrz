import { getData, postData } from '@/lib/axios';

export const getInfoApi = (params) => getData('/auth/getInfoApp', params);
export const signInApi = (params) => postData('/auth/signIn', params);
export const sendOtpForgotPasswordApi = (params) => postData('/auth/sendOtpForgotPassword', params);
export const confirmPasswordApi = (params) => postData('/auth/confirmPassword', params);