import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ConfigMd extends ModelBase {}

ConfigMd.init('Config', {
  updateBy: { type: ObjectId, ref: 'Account' },
  type: { type: Number, enum: [1, 2, 3], description: '1: Cấu hình chấm công, 2: Cấu hình tính lương, 3: Cấu hình thuế' },
  timekeeping: { timekeepingWarning: String, locations: [{ latitude: Number, longitude: Number, location: String }] },
  salary: {
    salaryCoefficient: { type: Number, min: 0 },
    mandatory: {
      bhxh: { type: Number, min: 0 },
      bhyt: { type: Number, min: 0 },
      bhtn: { type: Number, min: 0 },
      unionDues: { type: Number, min: 0 }
    },
    ot: {
      day: { type: Number, min: 0 },
      sunday: { type: Number, min: 0 },
      holiday: { type: Number, min: 0 }
    },
    soonLate: [
      {
        from: Number,
        to: Number,
        value: Number,
        type: { type: Number, enum: [1, 2], description: '1: Trừ trực tiếp (VNĐ), 2: Trừ theo % công' }
      }
    ],
    holidays: [{ type: String }],
  },
  tax: {
    self: { type: Number, min: 0 },
    dependent: { type: Number, min: 0 },
    taxs: [{ from: Number, to: Number, value: Number, note: String }]
  },
  note: { type: String },
  files: [{ type: String }],
  deletedAt: { type: Date }
});

export const listConfigMd = (where, page, limit, populates, attr, sort) => {
  return ConfigMd.find({ where, page, limit, populates, attr, sort });
};

export const countConfigMd = (where) => {
  return ConfigMd.count({ where });
};

export const detailConfigMd = (where, populates, attr) => {
  return ConfigMd.findOne({ where, populates, attr });
};

export const createConfigMd = (attr) => {
  return ConfigMd.create({ attr });
};

export const updateConfigMd = (where, attr) => {
  return ConfigMd.update({ where, attr });
};

export const updateManyConfigMd = (where, attr) => {
  return ConfigMd.update({ where, attr });
};

export const deleteConfigMd = (where) => {
  return ConfigMd.delete({ where });
};
