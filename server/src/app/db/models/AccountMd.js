import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class AccountMd extends ModelBase {}

AccountMd.init('Account', {
  staffCode: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String },
  gender: { type: Number, required: true, enum: [1, 2, 3], description: "1: Nam, 2: Nữ, 3: Khác" },
  birthday: { type: Date, required: true },
  role: { type: String, required: true },
  avatar: { type: String },
  bankAccount: { type: String },
  bank: { type: String },
  department: { type: ObjectId, ref: 'Department' },
  position: { type: ObjectId, ref: 'Position' },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  lastLogin: { type: Date },
  token: { type: String },
  otp: { type: String },
  timeSendOtp: { type: Date },
  deletedAt: { type: Date }
});

export const listAccountMd = (where, page, limit, populates, attr, sort) => {
  return AccountMd.find({ where, page, limit, populates, attr, sort });
};

export const countAccountMd = (where) => {
  return AccountMd.count({ where });
};

export const detailAccountMd = (where, populates, attr) => {
  return AccountMd.findOne({ where, populates, attr });
};

export const createAccountMd = (attr) => {
  return AccountMd.create({ attr });
};

export const updateAccountMd = (where, attr) => {
  return AccountMd.update({ where, attr });
};

export const updateManyAccountMd = (where, attr) => {
  return AccountMd.update({ where, attr });
};

export const deleteAccountMd = (where) => {
  return AccountMd.delete({ where });
};
