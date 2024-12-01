import { ModelBase } from '@config';

export class ApplicationMd extends ModelBase {}

ApplicationMd.init('Application', {
  updatedBy: { type: String },
  department: { type: String, required: true },
  account: { type: String, required: true },
  shift: { type: String, required: true },
  type: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    description:
      '1: Đơn xin nghỉ (phép năm), 2: Đơn xin nghỉ (không phép), 3: Đơn xin nghỉ (phép đặc biệt), 4: Đơn xác nhận công, 5: Đơn xin đi trễ, về sớm, 6: Đơn OT, 7: Đơn công tác, 8: Đơn xin nghỉ dài hạn, 9: Yêu cầu tính lại lương'
  },
  typez: {
    type: Number,
    default: 1,
    description: '1: Đơn bình thường, 2: Đơn giám đốc duyệt'
  },
  dates: [{ type: String, required: true }],
  reason: { type: String, required: true },
  soon: { type: String },
  late: { type: String },
  fromTime: { type: String },
  toTime: { type: String },
  files: [{ type: String }],
  status: { type: Number, enum: [1, 2, 3, 4], default: 1, description: '1: Chờ duyệt, 2: Đã duyệt, 3: Từ chối, 4: Hủy' },
  note: { type: String },
  deletedAt: { type: Date }
});
