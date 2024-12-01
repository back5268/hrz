import { ConfigMd } from "@models";

export const listConfigMd = (where, page, limit, populates, attr, sort) => {
  return ConfigMd.find({ where, page, limit, populates, attr, sort });
};

export const countConfigMd = (where) => {
  return ConfigMd.count({ where });
};

export const detailConfigMd = (where, populates, attr) => {
  return ConfigMd.findOne({ where, populates, attr });
};

export const createConfigMd = (attr) => {
  return ConfigMd.create({ attr });
};

export const updateConfigMd = (where, attr) => {
  return ConfigMd.update({ where, attr });
};

export const updateManyConfigMd = (where, attr) => {
  return ConfigMd.update({ where, attr });
};

export const deleteConfigMd = (where) => {
  return ConfigMd.delete({ where });
};
