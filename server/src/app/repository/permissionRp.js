import { PermissionMd } from "@models";

export const listPermissionMd = (where, page, limit, populates, attr, sort) => {
  return PermissionMd.find({ where, page, limit, populates, attr, sort });
};

export const countPermissionMd = (where) => {
  return PermissionMd.count({ where });
};

export const detailPermissionMd = (where, populates, attr) => {
  return PermissionMd.findOne({ where, populates, attr });
};

export const createPermissionMd = (attr) => {
  return PermissionMd.create({ attr });
};

export const updatePermissionMd = (where, attr) => {
  return PermissionMd.update({ where, attr });
};

export const updateManyPermissionMd = (where, attr) => {
  return PermissionMd.update({ where, attr });
};

export const deletePermissionMd = (where) => {
  return PermissionMd.delete({ where });
};
