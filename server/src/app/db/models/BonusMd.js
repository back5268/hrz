import { ModelBase } from '@config';

class BonusMd extends ModelBase {}

BonusMd.init('Bonus', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  month: { type: String, required: true },
  departments: [{ type: String, required: true }],
  accounts: [{ type: String, required: true }],
  value: { type: Number, required: true, min: 0 },
  type: { type: Number, enum: [1, 2], default: 1, description: '1: Thưởng theo tiền cố định, 2: Thưởng theo % lương cơ bản' },
  deletedAt: { type: Date }
});

export const listBonusMd = (where, page, limit, populates, attr, sort) => {
  return BonusMd.find({ where, page, limit, populates, attr, sort });
};

export const countBonusMd = (where) => {
  return BonusMd.count({ where });
};

export const detailBonusMd = (where, populates, attr) => {
  return BonusMd.findOne({ where, populates, attr });
};

export const createBonusMd = (attr) => {
  return BonusMd.create({ attr });
};

export const updateBonusMd = (where, attr) => {
  return BonusMd.update({ where, attr });
};

export const updateManyBonusMd = (where, attr) => {
  return BonusMd.update({ where, attr });
};

export const deleteBonusMd = (where) => {
  return BonusMd.delete({ where });
};
