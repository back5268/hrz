import { ModelBase } from '@config';

export class ImportLogMd extends ModelBase {}

ImportLogMd.init('ImportLog', {
  by: { type: String, required: true },
  deviceCode: { type: String, required: true },
  staffCode: { type: String, required: true },
  shiftCode: { type: String, required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Thành công, 1: Thất bại' },
  mess: { type: String },
  deletedAt: { type: Date }
});
