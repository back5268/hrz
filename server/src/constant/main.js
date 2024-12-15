export const VALIDATE_TYPE = {
  EMAIL: 'email',
  STRING: 'string',
  NUMBER: 'number',
  PHONE: 'phone',
  JSON: 'json',
  ARRAY: 'array',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime'
};

export const employeeTypes = [
  { name: 'Nhân viên chính thức', _id: 1 },
  { name: 'Thử việc', _id: 2 },
  { name: 'Thực tập sinh', _id: 3 }
];

export const dateData = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

export const days = [
  { name: 'Chủ nhật', _id: 'su' },
  { name: 'Thứ 2', _id: 'mo' },
  { name: 'Thứ 3', _id: 'tu' },
  { name: 'Thứ 4', _id: 'we' },
  { name: 'Thứ 5', _id: 'th' },
  { name: 'Thứ 6', _id: 'fr' },
  { name: 'Thứ 7', _id: 'sa' }
];

export const salaryStatus = [
  { name: 'Chờ xác nhận', _id: 1, severity: 'warning' },
  { name: 'Chờ trưởng phòng duyệt', _id: 2, severity: 'info' },
  { name: 'Chờ giám đốc duyệt', _id: 3, severity: 'success' },
  { name: 'Đã duyệt', _id: 4, severity: 'success' }
];
