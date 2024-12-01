import { DeviceMd } from "@models";

export const listDeviceMd = (where, page, limit, populates, attr, sort) => {
  return DeviceMd.find({ where, page, limit, populates, attr, sort });
};

export const countDeviceMd = (where) => {
  return DeviceMd.count({ where });
};

export const detailDeviceMd = (where, populates, attr) => {
  return DeviceMd.findOne({ where, populates, attr });
};

export const createDeviceMd = (attr) => {
  return DeviceMd.create({ attr });
};

export const updateDeviceMd = (where, attr) => {
  return DeviceMd.update({ where, attr });
};

export const updateManyDeviceMd = (where, attr) => {
  return DeviceMd.update({ where, attr });
};

export const deleteDeviceMd = (where) => {
  return DeviceMd.delete({ where });
};
