import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TimekeepingLogMd extends ModelBase {}

TimekeepingLogMd.init('TimekeepingLog', {
  department: { type: ObjectId, ref: 'Department', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  shift: { type: ObjectId, ref: 'Account' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  device: { type: String },
  deviceName: { type: String },
  deletedAt: { type: Date }
});

export const listTimekeepingLogMd = (where, page, limit, populates, attr, sort) => {
  return TimekeepingLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countTimekeepingLogMd = (where) => {
  return TimekeepingLogMd.count({ where });
};

export const detailTimekeepingLogMd = (where, populates, attr) => {
  return TimekeepingLogMd.findOne({ where, populates, attr });
};

export const createTimekeepingLogMd = (attr) => {
  return TimekeepingLogMd.create({ attr });
};

export const updateTimekeepingLogMd = (where, attr) => {
  return TimekeepingLogMd.update({ where, attr });
};

export const updateManyTimekeepingLogMd = (where, attr) => {
  return TimekeepingLogMd.update({ where, attr });
};

export const deleteTimekeepingLogMd = (where) => {
  return TimekeepingLogMd.delete({ where });
};
