import { ModelBase } from '@config';

export class ContactMd extends ModelBase {}

ContactMd.init('Contact', {
  account: { type: String, required: true },
  maritalStatus: { type: Number, enum: [1, 2], description: '1: Độc thân, 2: Đã kết hôn' },
  religion: { type: String, description: 'Tôn giáo' },
  permanentAddress: { type: String, description: 'Địa chỉ thường trú' },
  cmtFiles: [{ type: String }],
  contacts: [
    {
      fullName: String,
      phone: String,
      address: String,
      relation: { type: Number, enum: [1, 2, 3, 4, 5], description: '1: Vợ/Chồng, 2: Con, 3: Bố/Mẹ, 4: Anh/Chị/Em, 5: Khác' }
    }
  ],
  deletedAt: { type: Date }
});
