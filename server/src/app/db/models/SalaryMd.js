import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class SalaryMd extends ModelBase {}

SalaryMd.init('Salary', {
  by: { type: ObjectId, ref: 'Account', required: true },
  department: { type: String, required: true },
  account: { type: String, required: true },
  month: { type: Number, min: 0, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  baseSalary: { type: Number, min: 0, required: true },
  numberDay: { type: Number, min: 0, required: true },
  allowances: [
    {
      name: String,
      value: { type: Number, min: 0 },
      type: { type: Number, enum: [1, 2], description: '1: Trợ cấp theo tháng, 2: Trợ cấp theo ngày công' },
      summary: { type: Number, min: 0 }
    }
  ],
  allowanceAmount: { type: Number, min: 0, required: true },
  nomalWork: { total: Number, number: Number, summary: Number },
  otWork: { total: Number, number: Number, summary: Number },
  mandatory: {
    bhxh: { value: Number, summary: Number },
    bhyt: { value: Number, summary: Number },
    bhtn: { value: Number, summary: Number },
    unionDues: { value: Number, summary: Number }
  },
  mandatoryAmount: { type: Number, min: 0, required: true },
  soonLates: [
    {
      date: { type: String, min: 0 },
      value: { type: Number, min: 0 },
      summary: { type: Number, min: 0 }
    }
  ],
  bonuses: [
    {
      name: { type: String, min: 0 },
      summary: { type: Number, min: 0 }
    }
  ],
  tax: { self: Number, dependent: { value: Number, quantity: Number }, rate: Number, total: Number },
  summary: { type: Number, min: 0, required: true },
  status: { type: Number, enum: [1, 2], default: 1, description: '1: Chờ duyệt, 2: Đã duyệt' },
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
