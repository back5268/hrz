import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ShiftMd extends ModelBase {}

ShiftMd.init('Shift', {
  name: { type: String, required: true },
  code: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date },
  dates: [
    { date: String, timeStart: String, timeEnd: String, breakTimeStart: String, breakTimeEnd: String, totalTime: Number, totalWork: Number }
  ],
  accounts: [{ type: ObjectId, ref: 'Account' }],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});

export const listShiftMd = (where, page, limit, populates, attr, sort) => {
  return ShiftMd.find({ where, page, limit, populates, attr, sort });
};

export const countShiftMd = (where) => {
  return ShiftMd.count({ where });
};

export const detailShiftMd = (where, populates, attr) => {
  return ShiftMd.findOne({ where, populates, attr });
};

export const createShiftMd = (attr) => {
  return ShiftMd.create({ attr });
};

export const updateShiftMd = (where, attr) => {
  return ShiftMd.update({ where, attr });
};

export const updateManyShiftMd = (where, attr) => {
  return ShiftMd.update({ where, attr });
};

export const deleteShiftMd = (where) => {
  return ShiftMd.delete({ where });
};
