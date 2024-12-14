import { ModelBase } from '@config';

export class BonusMd extends ModelBase {}

BonusMd.init('Bonus', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  month: { type: Number, required: true },
  departments: [{ type: String, required: true }],
  accounts: [{ type: String, required: true }],
  value: { type: Number, required: true, min: 0 },
  type: { type: Number, enum: [1, 2], default: 1, description: '1: Thưởng theo tiền cố định, 2: Thưởng theo % lương cơ bản' },
  deletedAt: { type: Date }
});
