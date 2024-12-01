import { WorkHistoryMd } from "@models";

export const listWorkHistoryMd = (where, page, limit, populates, attr, sort) => {
  return WorkHistoryMd.find({ where, page, limit, populates, attr, sort });
};

export const countWorkHistoryMd = (where) => {
  return WorkHistoryMd.count({ where });
};

export const detailWorkHistoryMd = (where, populates, attr) => {
  return WorkHistoryMd.findOne({ where, populates, attr });
};

export const createWorkHistoryMd = (attr) => {
  return WorkHistoryMd.create({ attr });
};

export const updateWorkHistoryMd = (where, attr) => {
  return WorkHistoryMd.update({ where, attr });
};

export const updateManyWorkHistoryMd = (where, attr) => {
  return WorkHistoryMd.update({ where, attr });
};

export const deleteWorkHistoryMd = (where) => {
  return WorkHistoryMd.delete({ where });
};
