import { ModelBase } from '@config';

class ContactMd extends ModelBase {}

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

export const listContactMd = (where, page, limit, populates, attr, sort) => {
  return ContactMd.find({ where, page, limit, populates, attr, sort });
};

export const countContactMd = (where) => {
  return ContactMd.count({ where });
};

export const detailContactMd = (where, populates, attr) => {
  return ContactMd.findOne({ where, populates, attr });
};

export const createContactMd = (attr) => {
  return ContactMd.create({ attr });
};

export const updateContactMd = (where, attr) => {
  return ContactMd.update({ where, attr });
};

export const updateManyContactMd = (where, attr) => {
  return ContactMd.update({ where, attr });
};

export const deleteContactMd = (where) => {
  return ContactMd.delete({ where });
};
