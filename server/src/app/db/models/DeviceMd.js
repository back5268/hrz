import { ModelBase } from '@config';

export class DeviceMd extends ModelBase {}

DeviceMd.init('Device', {
  updatedBy: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  location: { type: String },
  type: { type: Number, required: true, enum: [1, 2, 3], description: '1: Chấm công khuôn mặt, 2: Chấm công vân tay, 3: Chấm công thẻ từ' },
  ipAddress: { type: String },
  departments: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});
