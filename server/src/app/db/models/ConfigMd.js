import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class ConfigMd extends ModelBase {}

ConfigMd.init('Config', {
  updateBy: { type: ObjectId, ref: 'Account' },
  type: { type: Number, enum: [1, 2, 3], description: '1: Cấu hình chấm công, 2: Cấu hình tính lương, 3: Cấu hình thuế' },
  timekeeping: {
    timekeepingWarning: String,
    locations: [{ latitude: Number, longitude: Number, location: String }],
    numberDayOffPermonth: Number,
    date: Number,
    time: String
  },
  salary: {
    salaryCoefficient: { type: Number, min: 0 },
    mandatory: {
      bhxh: { type: Number, min: 0 },
      bhyt: { type: Number, min: 0 },
      bhtn: { type: Number, min: 0 },
      unionDues: { type: Number, min: 0 }
    },
    ot: {
      day: { type: Number, min: 0 },
      sunday: { type: Number, min: 0 },
      holiday: { type: Number, min: 0 }
    },
    soonLate: [
      {
        from: Number,
        to: Number,
        value: Number,
        type: { type: Number, enum: [1, 2], description: '1: Trừ trực tiếp (VNĐ), 2: Trừ theo % công' }
      }
    ],
    holidays: [{ type: String }]
  },
  tax: {
    self: { type: Number, min: 0 },
    dependent: { type: Number, min: 0 },
    taxs: [{ from: Number, to: Number, value: Number, note: String }]
  },
  note: { type: String },
  files: [{ type: String }],
  deletedAt: { type: Date }
});
