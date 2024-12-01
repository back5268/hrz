import { BonusMd } from "@models";

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
