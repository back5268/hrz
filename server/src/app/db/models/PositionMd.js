import { ModelBase } from '@config';

export class PositionMd extends ModelBase {}

PositionMd.init('Position', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  allowances: [
    {
      name: String,
      amount: Number,
      type: { type: Number, enum: [1, 2], description: '1: Trợ cấp theo tháng, 2: Trợ cấp theo ngày làm việc thực tế' }
    }
  ],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});
