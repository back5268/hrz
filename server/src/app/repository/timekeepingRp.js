import { TimekeepingMd } from "@models";

export const listTimekeepingMd = (where, page, limit, populates, attr, sort) => {
  return TimekeepingMd.find({ where, page, limit, populates, attr, sort });
};

export const countTimekeepingMd = (where) => {
  return TimekeepingMd.count({ where });
};

export const detailTimekeepingMd = (where, populates, attr) => {
  return TimekeepingMd.findOne({ where, populates, attr });
};

export const createTimekeepingMd = (attr) => {
  return TimekeepingMd.create({ attr });
};

export const updateTimekeepingMd = (where, attr) => {
  return TimekeepingMd.update({ where, attr });
};

export const updateManyTimekeepingMd = (where, attr) => {
  return TimekeepingMd.update({ where, attr });
};

export const deleteTimekeepingMd = (where) => {
  return TimekeepingMd.delete({ where });
};

export const aggregateTimekeepingMd = (aggregate) => {
  return TimekeepingMd.aggregate({ aggregate });
};
