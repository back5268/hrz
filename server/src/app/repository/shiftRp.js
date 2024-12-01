import { ShiftMd } from "@models";

export const listShiftMd = (where, page, limit, populates, attr, sort) => {
  return ShiftMd.find({ where, page, limit, populates, attr, sort });
};

export const countShiftMd = (where) => {
  return ShiftMd.count({ where });
};

export const detailShiftMd = (where, populates, attr) => {
  return ShiftMd.findOne({ where, populates, attr });
};

export const createShiftMd = (attr) => {
  return ShiftMd.create({ attr });
};

export const updateShiftMd = (where, attr) => {
  return ShiftMd.update({ where, attr });
};

export const updateManyShiftMd = (where, attr) => {
  return ShiftMd.update({ where, attr });
};

export const deleteShiftMd = (where) => {
  return ShiftMd.delete({ where });
};
