import bcrypt from 'bcrypt';
import { confirmPasswordValid, sendOtpAuthValid, signInValid } from '@lib/validation';
import { detailAccountMd, listToolMd, updateAccountMd } from '@models';
import { generateNumber, validateData } from '@utils';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sendMailForgotPassword } from '@lib/node-mailer';
import moment from 'moment';
dotenv.config();

export const getInfo = async (req, res) => {
  try {
    let tools = req.tools;
    const permissions = req.permissions;
    if (!tools) {
      const toolz = await listToolMd({ status: 1 }, false, false, false, 'name icon items', { sort: 1 });
      tools = toolz.map((tool) => {
        const items = tool.items;
        let itemz = [];
        items.forEach((c) => {
          if (permissions.find((p) => p.route === c.route)) itemz.push(c);
        });
        if (itemz.length > 0) return { ...tool?._doc, items: itemz };
      });
      tools = tools.filter((t) => t);
    }
    res.json({ status: 1, data: { userInfo: req.account, tools } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getInfoApp = async (req, res) => {
  try {
    res.json({ status: 1, data: { userInfo: req.account } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error, value } = validateData(signInValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { username, password } = value;
    const checkUsername = await detailAccountMd({ $or: [{ phone: username }, { email: username }] });
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
    const { error, value } = validateData(sendOtpAuthValid, req.body);
    if (error) return { mess: error };
    const { username } = value;
    const otp = generateNumber(6);
    const checkUser = await detailAccountMd({ $or: [{ phone: username }, { email: username }] });
    if (!checkUser) return { mess: `Không tìm thấy người dùng!` };
    if (checkUser.status === 0) return { mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' };
    const { status, mess } = await sendMailForgotPassword({ to: checkUser.email, username, otp });
    if (!status) res.status(400).json({ status: 0, mess });
    else {
      await updateAccountMd({ _id: checkUser._id }, { otp, timeSendOtp: moment().format('YYYY-MM-DD') });
      res.json({ status: 1, data: checkUser.email });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const confirmPassword = async (req, res) => {
  try {
    const { error, value } = validateData(confirmPasswordValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { username, otp, password } = value;
    const checkUser = await detailAccountMd({ $or: [{ phone: username }, { email: username }] });
    if (!checkUser) return res.status(400).json({ status: 0, mess: `Không tìm thấy người dùng có tài khoản ${username}!` });
    if (checkUser.otp !== otp || new Date() - 5 * 60 * 1000 < new Date(checkUser.timeSendOtp))
      return res.status(400).json({ status: 0, mess: 'Mã xác nhận không đúng hoặc đã hết hạn!' });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const data = await updateAccountMd({ _id: checkUser._id }, { password: newPassword, token: '', otp: '' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
