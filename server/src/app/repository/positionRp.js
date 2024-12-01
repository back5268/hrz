import { PositionMd } from "@models";

export const listPositionMd = (where, page, limit, populates, attr, sort) => {
  return PositionMd.find({ where, page, limit, populates, attr, sort });
};

export const countPositionMd = (where) => {
  return PositionMd.count({ where });
};

export const detailPositionMd = (where, populates, attr) => {
  return PositionMd.findOne({ where, populates, attr });
};

export const createPositionMd = (attr) => {
  return PositionMd.create({ attr });
};

export const updatePositionMd = (where, attr) => {
  return PositionMd.update({ where, attr });
};

export const updateManyPositionMd = (where, attr) => {
  return PositionMd.update({ where, attr });
};

export const deletePositionMd = (where) => {
  return PositionMd.delete({ where });
};
