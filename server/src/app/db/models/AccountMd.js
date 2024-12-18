import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class AccountMd extends ModelBase {}

AccountMd.init('Account', {
  department: { type: ObjectId, ref: 'Department' },
  position: { type: ObjectId, ref: 'Position' },
  jobPosition: { type: ObjectId, ref: 'JobPosition' },
  staffCode: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String },
  birthday: { type: Date, required: true },
  cmt: { type: String, required: true },
  dateOfIssue: { type: Date, required: true },
  placeOfIssue: { type: String, required: true },
  address: { type: String, required: true },
  nationality: { type: String, default: 'Việt Nam', description: 'Quốc tịch' },
  gender: { type: Number, required: true, enum: [1, 2, 3], description: '1: Nam, 2: Nữ, 3: Khác' },
  role: { type: String, enum: ['staff', 'admin'], default: 'staff' },
  avatar: { type: String },
  numberDayoff: { type: Number, default: 0 },
  dateIn: { type: Date },
  bankAccount: { type: String, required: true },
  bank: { type: Number },
  salary: { type: Number, min: 0, required: true },
  type: { type: Number, enum: [1, 2, 3], default: 1, description: '1: Nhân viên chính thức, 2: Thử việc, 3: Thực tập sinh' },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  lastLogin: { type: Date },
  token: { type: String },
  otp: { type: String },
  timeSendOtp: { type: Date },
  deletedAt: { type: Date }
});
