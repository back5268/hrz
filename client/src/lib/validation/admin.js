import * as yup from 'yup';

export const PositionValidation = yup.object({
  name: yup.string().required('Tên chức vụ không được bỏ trống!'),
  code: yup.string().required('Mã chức vụ không được bỏ trống!'),
});

export const JobPositionValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  code: yup.string().required('Mã công việc không được bỏ trống!'),
  minSalary: yup.number().required('Mức lương tối thiểu không được bỏ trống!').typeError('Vui lòng chỉ nhập số!'),
  maxSalary: yup.number().required('Mức lương tối đa không được bỏ trống!').typeError('Vui lòng chỉ nhập số!'),
});

export const DepartmentValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  code: yup.string().required('Mã công việc không được bỏ trống!'),
});
