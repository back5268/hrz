import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ScheduleMd extends ModelBase {}

ScheduleMd.init('Schedule', {
  department: { type: ObjectId, ref: 'Department', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  shift: { type: ObjectId, ref: 'Shift', required: true },
  date: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  breakTimeStart: { type: String },
  breakTimeEnd: { type: String },
  totalTime: { type: Number, required: true },
  totalWork: { type: Number, required: true },
  checkInTime: { type: String },
  checkOutTime: { type: String },
  soon: { type: Number },
  late: { type: Number },
  totalTimeReality: { type: Number },
  totalWorkReality: { type: Number },
  summary: { type: Number },
  type: { type: Number, enum: [1, 2], description: '1: Công việc bình thường, 2: OT' },
  Requests: [{ type: ObjectId, ref: 'Request' }],
  deletedAt: { type: Date }
});

export const listScheduleMd = (where, page, limit, populates, attr, sort) => {
  return ScheduleMd.find({ where, page, limit, populates, attr, sort });
};

export const countScheduleMd = (where) => {
  return ScheduleMd.count({ where });
};

export const detailScheduleMd = (where, populates, attr) => {
  return ScheduleMd.findOne({ where, populates, attr });
};

export const createScheduleMd = (attr) => {
  return ScheduleMd.create({ attr });
};

export const updateScheduleMd = (where, attr) => {
  return ScheduleMd.update({ where, attr });
};

export const updateManyScheduleMd = (where, attr) => {
  return ScheduleMd.update({ where, attr });
};

export const deleteScheduleMd = (where) => {
  return ScheduleMd.delete({ where });
};
