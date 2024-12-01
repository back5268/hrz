import { NewMd } from "@models";

export const listNewMd = (where, page, limit, populates, attr, sort) => {
  return NewMd.find({ where, page, limit, populates, attr, sort });
};

export const countNewMd = (where) => {
  return NewMd.count({ where });
};

export const detailNewMd = (where, populates, attr) => {
  return NewMd.findOne({ where, populates, attr });
};

export const createNewMd = (attr) => {
  return NewMd.create({ attr });
};

export const updateNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const updateManyNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const deleteNewMd = (where) => {
  return NewMd.delete({ where });
};
