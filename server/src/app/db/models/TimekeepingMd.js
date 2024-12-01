import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class TimekeepingMd extends ModelBase {}

TimekeepingMd.init('Timekeeping', {
  department: { type: ObjectId, ref: 'Department', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  shift: { type: ObjectId, ref: 'Shift' },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  timeBreakStart: { type: String },
  timeBreakEnd: { type: String },
  totalTime: { type: Number, required: true },
  totalWork: { type: Number, required: true },
  checkInTime: { type: String },
  checkOutTime: { type: String },
  soon: { type: Number },
  late: { type: Number },
  totalTimeReality: { type: Number },
  totalWorkReality: { type: Number },
  summary: { type: Number },
  type: { type: Number, enum: [1, 2], default: 1, description: '1: Công việc bình thường, 2: OT' },
  applications: [{ type: ObjectId, ref: 'Application' }],
  deletedAt: { type: Date }
});
