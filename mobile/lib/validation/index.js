import * as yup from 'yup';

export const ApplicationValidation = yup.object({
  shift: yup.string().required('Ca làm việc không được bỏ trống!'),
  type: yup.string().required('Loại đơn không được bỏ trống!'),
  reason: yup.string().required('Lý do tạo đơn không được bỏ trống!')
});
