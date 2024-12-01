import { ImportLogMd } from "@models";

export const listImportLogMd = (where, page, limit, populates, attr, sort) => {
  return ImportLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countImportLogMd = (where) => {
  return ImportLogMd.count({ where });
};

export const detailImportLogMd = (where, populates, attr) => {
  return ImportLogMd.findOne({ where, populates, attr });
};

export const createImportLogMd = (attr) => {
  return ImportLogMd.create({ attr });
};

export const updateImportLogMd = (where, attr) => {
  return ImportLogMd.update({ where, attr });
};

export const updateManyImportLogMd = (where, attr) => {
  return ImportLogMd.update({ where, attr });
};

export const deleteImportLogMd = (where) => {
  return ImportLogMd.delete({ where });
};
