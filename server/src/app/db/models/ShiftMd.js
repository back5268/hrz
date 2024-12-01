import { ModelBase } from '@config';

export class ShiftMd extends ModelBase {}

ShiftMd.init('Shift', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date },
  dates: [
    { date: String, timeStart: String, timeEnd: String, timeBreakStart: String, timeBreakEnd: String, totalTime: Number, totalWork: Number }
  ],
  departments: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});
