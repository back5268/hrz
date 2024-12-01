import * as yup from 'yup';

export const SigninValidation = yup.object({
  username: yup.string().min(3, 'Tài khoản cần dài ít nhất 3 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ cái!')
    .required()
});

export const ChangePasswordValidation = yup.object({
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ cái!')
    .required(),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ cái!')
    .required()
});

export const ForgotPasswordValidation = yup.object({
  username: yup.string().min(3, 'Tài khoản cần dài ít nhất 3 ký tự!').required()
});

export const ConfirmPasswordValidation = yup.object({
  otp: yup.string().min(6, 'Mã xác nhận cần dài ít nhất 6 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ cái!')
    .required()
});

export const ApplicationValidation = yup.object({
  shift: yup.string().required('Ca làm việc không được bỏ trống!'),
  type: yup.string().required('Loại đơn không được bỏ trống!'),
  reason: yup.string().required('Lý do tạo đơn không được bỏ trống!')
});

export const SalaryValidation = yup.object({
  reason: yup.string().required('Lý do không được bỏ trống!'),
});
