import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class SalaryMd extends ModelBase {}

SalaryMd.init('Salary', {
  by: { type: ObjectId, ref: 'Account', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  salarySetup: { type: ObjectId, ref: 'SalarySetup', required: true },
  month: { type: Number, min: 0, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  officialSalary: { type: Number, min: 0, required: true },
  totalWork: { type: Number, min: 0, required: true },
  totalWorkReality: { type: Number, min: 0, required: true },
  mandatory: {
    bhxh: { value: Number, total: Number },
    bhyt: { value: Number, total: Number },
    bhtn: { value: Number, total: Number },
    unionDues: { value: Number, total: Number }
  },
  allowance: [
    {
      name: String,
      value: { type: Number, min: 0 },
      total: { type: Number, min: 0 },
      type: { type: Number, enum: [1, 2], description: '1: Trợ cấp theo tháng, 2: Trợ cấp theo ngày công' }
    }
  ],
  ot: {
    day: { value: Number, quantity: Number, total: Number },
    sunday: { value: Number, quantity: Number, total: Number },
    holiday: { value: Number, quantity: Number, total: Number },
    total: { type: Number, min: 0, required: true }
  },
  soonLate: {
    value: { type: Number, min: 0 },
    time: { type: Number, min: 0 },
    quantity: { type: Number, min: 0 },
    total: { type: Number, min: 0 }
  },
  tax: { self: Number, dependent: { value: Number, quantity: Number }, rate: Number, total: Number },
  status: { type: Number, enum: [0, 1, 2, 3], default: 0, description: '0: Chờ duyệt, 1: Đã duyệt, 2: Hủy, 3: Đã gửi' },
  deletedAt: { type: Date }
});

export const listSalaryMd = (where, page, limit, populates, attr, sort) => {
  return SalaryMd.find({ where, page, limit, populates, attr, sort });
};

export const countSalaryMd = (where) => {
  return SalaryMd.count({ where });
};

export const detailSalaryMd = (where, populates, attr) => {
  return SalaryMd.findOne({ where, populates, attr });
};

export const createSalaryMd = (attr) => {
  return SalaryMd.create({ attr });
};

export const updateSalaryMd = (where, attr) => {
  return SalaryMd.update({ where, attr });
};

export const updateManySalaryMd = (where, attr) => {
  return SalaryMd.update({ where, attr });
};

export const deleteSalaryMd = (where) => {
  return SalaryMd.delete({ where });
};
