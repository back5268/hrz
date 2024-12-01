import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class SalaryLogMd extends ModelBase {}

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
