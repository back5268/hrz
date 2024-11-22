import express from 'express';
import { changePassword, confirmPassword, getInfo, getInfoApp, sendOtpForgotPassword, signIn } from '@controller';
import { authMiddleware, permissionMiddleware } from '@middleware';
require('dotenv').config();

export const authRouter = express.Router();

authRouter.get('/getInfo', authMiddleware, permissionMiddleware, getInfo);
authRouter.get('/getInfoApp', authMiddleware, getInfoApp);
authRouter.post('/signIn', signIn);
authRouter.post('/changePassword', authMiddleware, permissionMiddleware, changePassword);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);
