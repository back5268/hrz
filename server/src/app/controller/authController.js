import bcrypt from 'bcrypt';
import { confirmPasswordValid, signInValid } from '@lib/validation';
import { detailAccountMd, updateAccountMd } from '@models';
import { validateData } from '@utils';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const getInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: req.account });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error, value } = validateData(signInValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { username, password } = value;
    const checkUsername = await detailAccountMd({ $or: [{ username }, { email: username }] });
    if (!checkUsername) return res.status(400).json({ status: 0, mess: 'Người dùng không tồn tại!' });
    if (checkUsername.status === 0)
      return res.status(400).json({ status: 0, mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' });
    const passLogin = await bcrypt.compare(password, checkUsername.password);
    if (!passLogin) return res.status(400).json({ status: 0, mess: 'Mật khẩu không chính xác!' });
    const token = jwt.sign({ _id: checkUsername._id }, process.env.JWT_SECRET_TOKEN);
    await updateAccountMd({ _id: checkUsername._id }, { token, lastLogin: new Date() });
    res.json({ status: 1, data: token });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const sendOtpForgotPassword = async (req, res) => {
  try {
    const { data, mess } = await sendOtpAuthRepo(req.body, 2);
    if (data && !mess) res.json({ status: 1, data });
    else res.status(400).json({ status: 0, mess });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const confirmPassword = async (req, res) => {
  try {
    const { error, value } = validateData(confirmPasswordValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { username, otp, password } = value;
    const checkUser = await detailAccountMd({ username });
    if (!checkUser) return res.status(400).json({ status: 0, mess: `Không tìm thấy người dùng có tài khoản ${username}!` });
    if (!(checkUser.otp === otp)) return res.status(400).json({ status: 0, mess: 'Mã xác nhận không đúng hoặc đã hết hạn!' });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const data = await updateAccountMd({ _id: checkUser._id }, { password: newPassword, token: '', otp: '' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
