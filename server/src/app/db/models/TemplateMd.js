import { ModelBase } from '@config';

export class TemplateMd extends ModelBase {}

TemplateMd.init('Template', {
  updatedBy: { type: String },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    description:
      '1: Hợp đồng lao động, 2: Hợp đồng dịch vụ, 3: Hợp dồng thử việc, 4: Hợp đồng theo dự án, 5: Phiếu lương, 6: Quên mật khẩu, 7: Cảnh báo chấm công',
    required: true
  },
  subject: { type: String, required: true },
  content: { type: String },
  description: { type: String },
  deletedAt: { type: Date }
});
