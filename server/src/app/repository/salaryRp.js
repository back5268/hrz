import { SalaryMd } from "@models";

export const listSalaryMd = (where, page, limit, populates, attr, sort) => {
  return SalaryMd.find({ where, page, limit, populates, attr, sort });
};

export const countSalaryMd = (where) => {
  return SalaryMd.count({ where });
};

export const detailSalaryMd = (where, populates, attr) => {
  return SalaryMd.findOne({ where, populates, attr });
};

export const createSalaryMd = (attr) => {
  return SalaryMd.create({ attr });
};

export const updateSalaryMd = (where, attr) => {
  return SalaryMd.update({ where, attr });
};

export const updateManySalaryMd = (where, attr) => {
  return SalaryMd.update({ where, attr });
};

export const deleteSalaryMd = (where) => {
  return SalaryMd.delete({ where });
};
