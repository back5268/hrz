import { REGEX } from '@constant';
import * as yup from 'yup';

export const PositionValidation = yup.object({
  name: yup.string().required('Tên chức vụ không được bỏ trống!'),
  code: yup.string().required('Mã chức vụ không được bỏ trống!')
});

export const JobPositionValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  code: yup.string().required('Mã công việc không được bỏ trống!'),
});

export const DepartmentValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  code: yup.string().required('Mã công việc không được bỏ trống!')
});

export const EmployeeValidation = yup.object({
  staffCode: yup.string().required('Mã nhân viên không được bỏ trống!'),
  fullName: yup.string().required('Tên nhân viên không được bỏ trống!'),
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Số điện thoại không đúng định dạng!').required('Số điện thoại không được bỏ trống!'),
  birthday: yup.string().required('Ngày sinh không được bỏ trống!'),
  cmt: yup.string().required('Số chứng minh thư không được bỏ trống!'),
  dateOfIssue: yup.string().required('Ngày cấp không được bỏ trống!'),
  placeOfIssue: yup.string().required('Nơi cấp không được bỏ trống!'),
  address: yup.string().required('Địa chỉ thường trú không được bỏ trống!'),
  position: yup.string().required('Chức vụ không được bỏ trống!'),
  jobPosition: yup.string().required('Vị trí công việc không được bỏ trống!'),
  bankAccount: yup.string().required('Số tài khoản không được bỏ trống!'),
  bank: yup.string().required('Ngân hàng không được bỏ trống!'),
  nationality: yup.string().required('Quốc tịch không được bỏ trống!'),
  dateIn: yup.string().required('Ngày vào không được bỏ trống!'),
  salary: yup.number().required('Lương cơ bản không được bỏ trống!').typeError('Lương cơ bản không được bỏ trống!')
});

export const ContractValidation = yup.object({
  code: yup.string().required('Số hợp đồng không được bỏ trống!'),
  type: yup.number().required('Loại hợp đồng không được bỏ trống!'),
  signedDate: yup.string().required('Ngày ký không được bỏ trống!'),
  expiredDate: yup.string().required('Ngày hết hạn không được bỏ trống!')
});

export const TemplateValidation = yup.object({
  type: yup.number().required('Loại mẫu không được bỏ trống!'),
  subject: yup.string().required('Tiêu đề không được bỏ trống!')
});

export const PermissionValidation = yup.object({
  name: yup.string().required('Tên nhóm quyền không được bỏ trống!')
});

export const NewValidation = yup.object({
  subject: yup.string().required('Tiêu đề không được bỏ trống!')
});

export const DeviceValidation = yup.object({
  name: yup.string().required('Tên thiết bị không được bỏ trống!'),
  code: yup.string().required('Mã thiết bị không được bỏ trống!'),
  type: yup.string().required('Loại thiết bị không được bỏ trống!'),
});

export const ShiftValidation = yup.object({
  name: yup.string().required('Tên ca làm việc không được bỏ trống!'),
  code: yup.string().required('Mã ca làm việc không được bỏ trống!'),
  dateStart: yup.string().required('Ngày áp dụng không được bỏ trống!'),
  dateEnd: yup.string(),
});
