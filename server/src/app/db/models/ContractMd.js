import { ModelBase } from '@config';

export class ContractMd extends ModelBase {}

ContractMd.init('Contract', {
  by: { type: String },
  updatedBy: { type: String },
  account: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: Number, required: true, enum: [1, 2, 3, 4] },
  signedDate: { type: Date, required: true },
  expiredDate: { type: Date, required: true },
  note: { type: String },
  status: { type: Number, required: true, enum: [1, 2, 3, 4] },
  template: { type: String },
  file: { type: String },
  deletedAt: { type: Date }
});
