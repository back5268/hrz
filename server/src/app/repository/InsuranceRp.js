import { InsuranceMd } from "@models";

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
