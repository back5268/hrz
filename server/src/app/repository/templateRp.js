import { TemplateMd } from "@models";

export const listTemplateMd = (where, page, limit, populates, attr, sort) => {
  return TemplateMd.find({ where, page, limit, populates, attr, sort });
};

export const countTemplateMd = (where) => {
  return TemplateMd.count({ where });
};

export const detailTemplateMd = (where, populates, attr) => {
  return TemplateMd.findOne({ where, populates, attr });
};

export const createTemplateMd = (attr) => {
  return TemplateMd.create({ attr });
};

export const updateTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const updateManyTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const deleteTemplateMd = (where) => {
  return TemplateMd.delete({ where });
};
