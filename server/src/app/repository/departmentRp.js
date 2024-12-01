import { DepartmentMd } from "@models";

export const listDepartmentMd = (where, page, limit, populates, attr, sort) => {
  return DepartmentMd.find({ where, page, limit, populates, attr, sort });
};

export const countDepartmentMd = (where) => {
  return DepartmentMd.count({ where });
};

export const detailDepartmentMd = (where, populates, attr) => {
  return DepartmentMd.findOne({ where, populates, attr });
};

export const createDepartmentMd = (attr) => {
  return DepartmentMd.create({ attr });
};

export const updateDepartmentMd = (where, attr) => {
  return DepartmentMd.update({ where, attr });
};

export const updateManyDepartmentMd = (where, attr) => {
  return DepartmentMd.update({ where, attr });
};

export const deleteDepartmentMd = (where) => {
  return DepartmentMd.delete({ where });
};

export const aggregateDepartmentMd = (aggregate) => {
  return DepartmentMd.aggregate({ aggregate });
};
