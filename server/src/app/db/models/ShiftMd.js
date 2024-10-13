import { ModelBase } from '@config';

class ShiftMd extends ModelBase {}

ShiftMd.init('Shift', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date },
  dates: [
    { date: String, timeStart: String, timeEnd: String, timeBreakStart: String, timeBreakEnd: String, totalTime: Number, totalWork: Number }
  ],
  departments: [{ type: String }],
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
