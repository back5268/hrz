import { detailTemplateMd } from '@models';
import { sendMail } from './config';

export const replaceFistText = (inputString = '', prefix = '\\$') => {
  const regex = new RegExp(`${prefix}\\w+\\s?`, 'g');
  return inputString.replace(regex, '');
};

export const convertParams = (params, html) => {
  for (const key of Object.keys(params)) {
    html = html.replaceAll(key, params[key]);
    html = html.replaceAll(key.toLocaleUpperCase(), params[key]);
  }
  return replaceFistText(html);
};

export const sendMailUse = async ({ type, params, to }) => {
  const template = await detailTemplateMd({ type, status: 1 })
  if (template) {
    const subject = convertParams(params, template.subject);
    const html = convertParams(params, template.content);
    return await sendMail({ to, subject, html, type });
  } else return { status: 0, mess: "Chưa có mẫu gửi thông báo!" }
};

export const sendMailForgotPassword = ({ to, username, otp }) => {
  return sendMailUse({ to, type: 6, params: { $username: username, $otp: otp } });
};