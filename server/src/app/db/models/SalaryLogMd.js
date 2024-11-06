import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class SalaryLogMd extends ModelBase {}

SalaryLogMd.init('SalaryLog', {
  title: { type: String, required: true },
  by: { type: ObjectId, ref: 'Account', required: true },
  month: { type: Number, min: 0, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  salarySetup: { type: Object },
  taxSetup: { type: Object },
  success: { type: Number, default: 0 },
  error: { type: Number, default: 0 },
  detail: [
    {
      account: { type: String, required: true },
      mess: { type: String },
      status: { type: Number, enum: [1, 2], description: '1: Thành công, 2: Thất bại', required: true }
    }
  ],
  status: { type: Number, enum: [1, 2], default: 1, description: '1: Đang xử lý, 2: Đã xử lý' },
  deletedAt: { type: Date }
});

export const listSalaryLogMd = (where, page, limit, populates, attr, sort) => {
  return SalaryLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countSalaryLogMd = (where) => {
  return SalaryLogMd.count({ where });
};

export const detailSalaryLogMd = (where, populates, attr) => {
  return SalaryLogMd.findOne({ where, populates, attr });
};

export const createSalaryLogMd = (attr) => {
  return SalaryLogMd.create({ attr });
};

export const updateSalaryLogMd = (where, attr) => {
  return SalaryLogMd.update({ where, attr });
};

export const updateManySalaryLogMd = (where, attr) => {
  return SalaryLogMd.update({ where, attr });
};

export const deleteSalaryLogMd = (where) => {
  return SalaryLogMd.delete({ where });
};
