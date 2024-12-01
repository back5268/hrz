import { SalaryLogMd } from "@models";

export const listSalaryLogMd = (where, page, limit, populates, attr, sort) => {
  return SalaryLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countSalaryLogMd = (where) => {
  return SalaryLogMd.count({ where });
};

export const detailSalaryLogMd = (where, populates, attr) => {
  return SalaryLogMd.findOne({ where, populates, attr });
};

export const createSalaryLogMd = (attr) => {
  return SalaryLogMd.create({ attr });
};

export const updateSalaryLogMd = (where, attr) => {
  return SalaryLogMd.update({ where, attr });
};

export const updateManySalaryLogMd = (where, attr) => {
  return SalaryLogMd.update({ where, attr });
};

export const deleteSalaryLogMd = (where) => {
  return SalaryLogMd.delete({ where });
};
