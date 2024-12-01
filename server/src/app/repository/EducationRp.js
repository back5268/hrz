import { EducationMd } from "@models";

export const listEducationMd = (where, page, limit, populates, attr, sort) => {
  return EducationMd.find({ where, page, limit, populates, attr, sort });
};

export const countEducationMd = (where) => {
  return EducationMd.count({ where });
};

export const detailEducationMd = (where, populates, attr) => {
  return EducationMd.findOne({ where, populates, attr });
};

export const createEducationMd = (attr) => {
  return EducationMd.create({ attr });
};

export const updateEducationMd = (where, attr) => {
  return EducationMd.update({ where, attr });
};

export const updateManyEducationMd = (where, attr) => {
  return EducationMd.update({ where, attr });
};

export const deleteEducationMd = (where) => {
  return EducationMd.delete({ where });
};
