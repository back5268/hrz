import { TimekeepingLogMd } from "@models";

export const listTimekeepingLogMd = (where, page, limit, populates, attr, sort) => {
  return TimekeepingLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countTimekeepingLogMd = (where) => {
  return TimekeepingLogMd.count({ where });
};

export const detailTimekeepingLogMd = (where, populates, attr) => {
  return TimekeepingLogMd.findOne({ where, populates, attr });
};

export const createTimekeepingLogMd = (attr) => {
  return TimekeepingLogMd.create({ attr });
};

export const updateTimekeepingLogMd = (where, attr) => {
  return TimekeepingLogMd.update({ where, attr });
};

export const updateManyTimekeepingLogMd = (where, attr) => {
  return TimekeepingLogMd.update({ where, attr });
};

export const deleteTimekeepingLogMd = (where) => {
  return TimekeepingLogMd.delete({ where });
};
