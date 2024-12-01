import { LogMd } from "@models";

export const listLogMd = (where, page, limit, populates, attr, sort) => {
  return LogMd.find({ where, page, limit, populates, attr, sort });
};

export const countLogMd = (where) => {
  return LogMd.count({ where });
};

export const detailLogMd = (where, populates, attr) => {
  return LogMd.findOne({ where, populates, attr });
};

export const createLogMd = (attr) => {
  return LogMd.create({ attr });
};

export const updateLogMd = (where, attr) => {
  return LogMd.update({ where, attr });
};

export const updateManyLogMd = (where, attr) => {
  return LogMd.update({ where, attr });
};

export const deleteLogMd = (where) => {
  return LogMd.delete({ where });
};
