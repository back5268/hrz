import { NotifyMd } from "@models";

export const listNotifyMd = (where, page, limit, populates, attr, sort) => {
  return NotifyMd.find({ where, page, limit, populates, attr, sort });
};

export const countNotifyMd = (where) => {
  return NotifyMd.count({ where });
};

export const detailNotifyMd = (where, populates, attr) => {
  return NotifyMd.findOne({ where, populates, attr });
};

export const createNotifyMd = (attr) => {
  return NotifyMd.create({ attr });
};

export const updateNotifyMd = (where, attr) => {
  return NotifyMd.update({ where, attr });
};

export const updateManyNotifyMd = (where, attr) => {
  return NotifyMd.update({ where, attr });
};

export const deleteNotifyMd = (where) => {
  return NotifyMd.delete({ where });
};
