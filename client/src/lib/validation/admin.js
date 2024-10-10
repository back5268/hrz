import { REGEX } from '@constant';
import * as yup from 'yup';

export const PositionValidation = yup.object({
  name: yup.string().required('Tên chức vụ không được bỏ trống!'),
  code: yup.string().required('Mã chức vụ không được bỏ trống!'),
});

export const JobPositionValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  code: yup.string().required('Mã công việc không được bỏ trống!'),
  minSalary: yup.number().required('Mức lương tối thiểu không được bỏ trống!').typeError('Mức lương tối thiểu không được bỏ trống!'),
  maxSalary: yup.number().required('Mức lương tối đa không được bỏ trống!').typeError('Mức lương tối thiểu không được bỏ trống!'),
});

export const DepartmentValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  code: yup.string().required('Mã công việc không được bỏ trống!'),
});

export const PersonnelValidation = yup.object({
  staffCode: yup.string().required('Mã nhân viên không được bỏ trống!'),
  fullName: yup.string().required('Tên nhân viên không được bỏ trống!'),
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Số điện thoại không đúng định dạng!').required('Số điện thoại không được bỏ trống!'),
  birthday: yup.string().required('Ngày sinh không được bỏ trống!'),
  cmt: yup.string().required('Số chứng minh thư không được bỏ trống!'),
  position: yup.string().required('Chức vụ không được bỏ trống!'),
  jobPosition: yup.string().required('Vị trí công việc không được bỏ trống!'),
  dateIn: yup.string().required('Ngày vào không được bỏ trống!'),
  salary: yup.number().required('Lương cơ bản không được bỏ trống!').typeError('Lương cơ bản không được bỏ trống!'),
});
