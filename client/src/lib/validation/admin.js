import * as yup from 'yup';

export const PositionValidation = yup.object({
  name: yup.string().required('Tên chức vụ không được bỏ trống!'),
  salaryBase: yup.number().required('Lương cơ bản không được bỏ trống!').typeError('Vui lòng chỉ nhập số!')
});
