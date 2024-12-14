import { ModelBase } from '@config';

export class NotifyMd extends ModelBase {}

NotifyMd.init('Notify', {
  fromBy: {
    type: Number,
    enum: [1, 2],
    detault: 1,
    description: '1: Thông báo từ hệ thống, 2: Thông báo từ người dùng'
  },
  by: { type: String },
  account: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Cảnh báo chấm công, 2: Tạo đơn từ, 3: Duyệt đơn từ, 4: Có phiếu lương cần xác nhận'
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
    description: '0: Chưa xem, 1: Xem nhưng chưa đọc, 2: Đã đọc'
  },
  data: { type: Object },
  deletedAt: { type: Date }
});
