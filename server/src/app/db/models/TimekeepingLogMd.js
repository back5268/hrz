import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class TimekeepingLogMd extends ModelBase {}

TimekeepingLogMd.init('TimekeepingLog', {
  department: { type: ObjectId, ref: 'Department', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  device: { type: String },
  deviceName: { type: String },
  deletedAt: { type: Date }
});
