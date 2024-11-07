import { ModelBase } from '@config';

class ImportLogMd extends ModelBase {}

ImportLogMd.init('ImportLog', {
  by: { type: String, required: true },
  deviceCode: { type: String, required: true },
  staffCode: { type: String, required: true },
  shiftCode: { type: String, required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Thành công, 1: Thất bại' },
  mess: { type: String },
  deletedAt: { type: Date }
});

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
