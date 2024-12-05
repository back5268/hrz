// export const API_URL = 'http://192.168.6.76:5000/';
export const API_URL = 'https://api.backz.s-tech.info/'

export const contractTypes = [
  { name: 'Hợp đồng lao động', _id: 1 },
  { name: 'Hợp đồng dịch vụ', _id: 2 },
  { name: 'Hợp dồng thử việc', _id: 3 },
  { name: 'Hợp đồng theo dự án', _id: 4 }
];

export const contractStatus = [
  { name: 'Đang hiệu lực', _id: 1, color: '#6a9f4a' },
  { name: 'Hết hiệu lực', _id: 2, color: '#f9c42f' },
  { name: 'Chưa hiệu lực', _id: 3, color: '#2594f4' },
  { name: 'Đã chấm dứt', _id: 4, color: '#d42d2f' }
];

export const applicationStatus = [
  { name: 'Chờ duyệt', _id: 1, color: '#f9c42f' },
  { name: 'Đã duyệt', _id: 2, color: '#6a9f4a' },
  { name: 'Từ chối', _id: 3, color: '#d42d2f' },
  { name: 'Hủy', _id: 4, color: '#2594f4' }
];

export const applicationTypes = [
  { name: 'Đơn xin nghỉ phép (phép năm)', _id: 1 },
  { name: 'Đơn xin nghỉ (không phép)', _id: 2 },
  { name: 'Đơn xin nghỉ phép (phép đặc biệt)', _id: 3 },
  { name: 'Đơn xác nhận công', _id: 4 },
  { name: 'Đơn xin đi trễ, về sớm', _id: 5 },
  { name: 'Đơn xin làm thêm giờ', _id: 6 },
  { name: 'Đơn công tác', _id: 7 },
  { name: 'Đơn xin nghỉ dài hạn', _id: 8 },
  { name: 'Yêu cầu tính lại lương', _id: 9 }
];

export const salaryStatus = [
  { name: 'Chờ xác nhận', _id: 1, color: '#2594f4' },
  { name: 'Chờ trưởng phòng duyệt', _id: 2, color: '#f9c42f' },
  { name: 'Chờ giám đốc duyệt', _id: 3, color: '#d42d2f' },
  { name: 'Đã duyệt', _id: 4, color: '#6a9f4a' }
];
