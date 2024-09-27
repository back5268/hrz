import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class AdjusmentLogMd extends ModelBase {}

AdjusmentLogMd.init('AdjusmentLog', {
  department: { type: ObjectId, ref: 'Department', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  type: { type: Number, required: true, enum: [1, 2], description: '1: Điều chuyển vị trí, 2: Điều chỉnh lương' },
  before: { type: Object },
  after: { type: Object },
  note: { type: String },
  deletedAt: { type: Date }
});

export const listAdjusmentLogMd = (where, page, limit, populates, attr, sort) => {
  return AdjusmentLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countAdjusmentLogMd = (where) => {
  return AdjusmentLogMd.count({ where });
};

export const detailAdjusmentLogMd = (where, populates, attr) => {
  return AdjusmentLogMd.findOne({ where, populates, attr });
};

export const createAdjusmentLogMd = (attr) => {
  return AdjusmentLogMd.create({ attr });
};

export const updateAdjusmentLogMd = (where, attr) => {
  return AdjusmentLogMd.update({ where, attr });
};

export const updateManyAdjusmentLogMd = (where, attr) => {
  return AdjusmentLogMd.update({ where, attr });
};

export const deleteAdjusmentLogMd = (where) => {
  return AdjusmentLogMd.delete({ where });
};
