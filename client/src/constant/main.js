export const toolActions = [
  { name: 'Thêm mới', _id: 'create' },
  { name: 'Xem', _id: 'read' },
  { name: 'Cập nhật', _id: 'update' },
  { name: 'Xóa', _id: 'delete' }
];

export const status = [
  { name: 'Hoạt động', _id: 1 },
  { name: 'Dừng hoạt động', _id: 0 }
];

export const genders = [
  { name: 'Nam', _id: 1 },
  { name: 'Nữ', _id: 2 },
  { name: 'Khác', _id: 3 }
];

export const personnelTypes = [
  { name: 'Nhân viên chính thức', _id: 1 },
  { name: 'Thử việc', _id: 2 },
  { name: 'Thực tập sinh', _id: 3 }
];

export const maritalStatus = [
  { name: 'Độc thân', _id: 1 },
  { name: 'Đã kết hôn', _id: 2 }
];

export const relations = [
  { name: 'Vợ/Chồng', _id: 1 },
  { name: 'Con', _id: 2 },
  { name: 'Bố/Mẹ', _id: 3 },
  { name: 'Anh/Chị/Em', _id: 4 },
  { name: 'Khác', _id: 5 }
];

export const taxAuths = [
  { name: 'Công ty', _id: 1 },
  { name: 'Cá nhân', _id: 2 }
];

export const allowanceTypes = [
  { name: 'Trợ cấp theo tháng', _id: 1 },
  { name: 'Trợ cấp theo ngày làm việc', _id: 2 }
];

export const qualifications = [
  { name: 'Trên đại học', _id: 1 },
  { name: 'Đại học', _id: 2 },
  { name: 'Cao đẳng', _id: 3 },
  { name: 'Trung cấp', _id: 4 },
  { name: 'Sơ cấp', _id: 5 },
  { name: 'Sinh viên', _id: 6 },
  { name: 'Khác', _id: 7 }
];

export const graduationTypes = [
  { name: 'Xuất sắc', _id: 1 },
  { name: 'Giỏi', _id: 2 },
  { name: 'Khá', _id: 3 },
  { name: 'Trung bình khá', _id: 4 },
  { name: 'Trung bình', _id: 5 },
  { name: 'Không xếp hạng', _id: 6 },
  { name: 'Không', _id: 7 }
];

export const contractTypes = [
  { name: 'Hợp đồng lao động', _id: 1 },
  { name: 'Hợp đồng dịch vụ', _id: 2 },
  { name: 'Hợp dồng thử việc', _id: 3 },
  { name: 'Hợp đồng theo dự án', _id: 4 }
];

export const contractStatus = [
  { name: 'Đang hiệu lực', _id: 1, severity: 'success' },
  { name: 'Hết hiệu lực', _id: 2, severity: 'warning' },
  { name: 'Chưa hiệu lực', _id: 3, severity: 'info' },
  { name: 'Đã chấm dứt', _id: 4, severity: 'danger' }
];

export const templateTypes = [
  { name: 'Hợp đồng lao động', _id: 1 },
  { name: 'Hợp đồng dịch vụ', _id: 2 },
  { name: 'Hợp dồng thử việc', _id: 3 },
  { name: 'Hợp đồng theo dự án', _id: 4 },
  { name: 'Phiếu lương', _id: 5 },
  { name: 'Quên mật khẩu', _id: 6 }
];

export const logStatus = [
  { name: "Đang gửi", _id: 0, severity: 'warning' },
  { name: "Đã gửi", _id: 1, severity: 'success' },
  { name: "Có lỗi", _id: 2, severity: 'danger' },
]
