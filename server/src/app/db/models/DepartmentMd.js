import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class DepartmentMd extends ModelBase {}

DepartmentMd.init('Department', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  manager: { type: ObjectId, ref: 'Account' },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});
