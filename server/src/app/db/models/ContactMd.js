import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ContactMd extends ModelBase {}

ContactMd.init('Contact', {
  account: { type: ObjectId, ref: 'Account', required: true },
  cmt: { type: String, required: true },
  dateOfIssue: { type: Date },
  placeOfIssue: { type: String },
  maritalStatus: { type: Number, enum: [1, 2], description: '1: Chưa kết hôn, 2: Đã kết hôn' },
  nationality: { type: String, description: 'Quốc tịch' },
  religion: { type: String, description: 'Tôn giáo' },
  address: { type: String, description: 'Địa chỉ' },
  permanentAddress: { type: String, description: 'Địa chỉ thường trú' },
  contacts: [
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