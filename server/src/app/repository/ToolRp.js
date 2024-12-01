import { ToolMd } from "@models";

export const listToolMd = (where, page, limit, populates, attr, sort) => {
  return ToolMd.find({ where, page, limit, populates, attr, sort });
};

export const countToolMd = (where) => {
  return ToolMd.count({ where });
};

export const detailToolMd = (where, populates, attr) => {
  return ToolMd.findOne({ where, populates, attr });
};

export const createToolMd = (attr) => {
  return ToolMd.create({ attr });
};

export const updateToolMd = (where, attr) => {
  return ToolMd.update({ where, attr });
};

export const updateManyToolMd = (where, attr) => {
  return ToolMd.update({ where, attr });
};

export const deleteToolMd = (where) => {
  return ToolMd.delete({ where });
};
