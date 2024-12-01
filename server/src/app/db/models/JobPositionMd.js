import { ModelBase } from '@config';

export class JobPositionMd extends ModelBase {}

JobPositionMd.init('JobPosition', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});
