import { ModelBase } from '@config';

export class LogMd extends ModelBase {}

LogMd.init('Log', {
  to: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    description:
      '1: Hợp đồng lao động, 2: Hợp đồng dịch vụ, 3: Hợp dồng thử việc, 4: Hợp đồng theo dự án, 5: Phiếu lương, 6: Quên mật khẩu, 7: Cảnh báo chấm công',
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    description: '0: Đang gửi, 1: Đã gửi, 2: Có lỗi'
  },
  mess: { type: String },
  deletedAt: { type: Date }
});
