import { ModelBase } from '@config';

class InsuranceMd extends ModelBase {}

InsuranceMd.init('Insurance', {
  account: { type: String, required: true },
  healthInsuranceNumber: { type: String, description: "Số bảo hiểm y tế" },
  socialInsuranceNumber: { type: String, description: "Số bảo hiểm xã hội" },
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

export const listInsuranceMd = (where, page, limit, populates, attr, sort) => {
  return InsuranceMd.find({ where, page, limit, populates, attr, sort });
};

export const countInsuranceMd = (where) => {
  return InsuranceMd.count({ where });
};

export const detailInsuranceMd = (where, populates, attr) => {
  return InsuranceMd.findOne({ where, populates, attr });
};

export const createInsuranceMd = (attr) => {
  return InsuranceMd.create({ attr });
};

export const updateInsuranceMd = (where, attr) => {
  return InsuranceMd.update({ where, attr });
};

export const updateManyInsuranceMd = (where, attr) => {
  return InsuranceMd.update({ where, attr });
};

export const deleteInsuranceMd = (where) => {
  return InsuranceMd.delete({ where });
};
