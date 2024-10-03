import { getData, postData } from '@lib/axios';

export const getInfoApi = (params) => getData('/auth/getInfo', params);
export const signinApi = (params) => postData('/auth/signin', params);
export const sendOtpForgotPasswordApi = (params) => postData('/auth/sendOtpForgotPassword', params);
export const confirmPasswordApi = (params) => postData('/auth/confirmPassword', params);
