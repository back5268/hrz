import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class SalarySetupMd extends ModelBase {}

SalarySetupMd.init('SalarySetup', {
  by: { type: ObjectId, ref: 'Account', required: true },
  updateBy: { type: ObjectId, ref: 'Account' },
  mandatory: {
    bhxh: { type: Number, min: 0, required: true },
    bhyt: { type: Number, min: 0, required: true },
    bhtn: { type: Number, min: 0, required: true },
    unionDues: { type: Number, min: 0, required: true }
  },
  allowance: [
    {
      name: String,
      value: { type: Number, min: 0 },
      type: { type: Number, enum: [1, 2], description: '1: Trợ cấp theo tháng, 2: Trợ cấp theo ngày công' }
    }
  ],
  ot: {
    day: { type: Number, min: 0, required: true },
    sunday: { type: Number, min: 0, required: true },
    holiday: { type: Number, min: 0, required: true }
  },
  soonLate: { value: { type: Number, min: 0 }, time: { type: Number, min: 0 } },
  before: { type: Object },
  note: { type: String },
  files: [{ type: String }],
  deletedAt: { type: Date }
});

export const listSalarySetupMd = (where, page, limit, populates, attr, sort) => {
  return SalarySetupMd.find({ where, page, limit, populates, attr, sort });
};

export const countSalarySetupMd = (where) => {
  return SalarySetupMd.count({ where });
};

export const detailSalarySetupMd = (where, populates, attr) => {
  return SalarySetupMd.findOne({ where, populates, attr });
};

export const createSalarySetupMd = (attr) => {
  return SalarySetupMd.create({ attr });
};

export const updateSalarySetupMd = (where, attr) => {
  return SalarySetupMd.update({ where, attr });
};

export const updateManySalarySetupMd = (where, attr) => {
  return SalarySetupMd.update({ where, attr });
};

export const deleteSalarySetupMd = (where) => {
  return SalarySetupMd.delete({ where });
};
