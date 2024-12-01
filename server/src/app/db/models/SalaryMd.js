import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class SalaryMd extends ModelBase {}

SalaryMd.init('Salary', {
  by: { type: ObjectId, ref: 'Account', required: true },
  department: { type: String, required: true },
  account: { type: String, required: true },
  accountInfo: { type: { type: Number }, salary: Number },
  month: { type: Number, min: 0, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  day: {
    noSalary: Number,
    day: Number,
    annualLeave: Number,
    holiday: Number,
    regime: Number,
    compensatoryLeave: Number,
    nomal: Number,
    ot: Number
  },
  officialSalary: { type: Number },
  allowances: [
    {
      name: String,
      value: { type: Number, min: 0 },
      type: { type: Number, enum: [1, 2], description: '1: Trợ cấp theo tháng, 2: Trợ cấp theo ngày công' },
      summary: { type: Number, min: 0 }
    }
  ],
  mandatory: {
    bhxh: { value: Number, summary: Number },
    bhyt: { value: Number, summary: Number },
    bhtn: { value: Number, summary: Number },
    unionDues: { value: Number, summary: Number }
  },
  mandatoryAmount: { type: Number },
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
  pretaxIncome: { type: Number },
  tax: { self: Number, dependent: { value: Number, quantity: Number }, total: Number, rate: Number, summary: Number },
  summary: { type: Number, min: 0, required: true },
  file: { type: String },
  status: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1,
    description: '1: Chờ xác nhận, 2: Chờ trưởng phòng duyệt, 3: Chờ giám đốc duyệt, 4: Đã duyệt'
  },
  deletedAt: { type: Date }
});
