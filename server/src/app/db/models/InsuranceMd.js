import { ModelBase } from '@config';

export class InsuranceMd extends ModelBase {}

InsuranceMd.init('Insurance', {
  account: { type: String, required: true },
  healthInsuranceNumber: { type: String, description: 'Số bảo hiểm y tế' },
  socialInsuranceNumber: { type: String, description: 'Số bảo hiểm xã hội' },
  taxCode: { type: String },
  taxAuth: { type: Number, enum: [], description: '' },
  taxFiles: [{ type: String }],
  dependents: [
    {
      fullName: String,
      gender: { type: Number, enum: [1, 2, 3], description: '1: Nam, 2: Nữ, 3: Khác' },
      birthday: Date,
      phone: String,
      cmt: String,
      address: String,
      relation: { type: Number, enum: [1, 2, 3, 4, 5], description: '1: Vợ/Chồng, 2: Con, 3: Bố/Mẹ, 4: Anh/Chị/Em, 5: Khác' }
    }
  ],
  deletedAt: { type: Date }
});
