import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TemplateMd extends ModelBase {}

TemplateMd.init('Template', {
  by: { type: ObjectId, ref: 'Account' },
  updateBy: { type: ObjectId, ref: 'Account' },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Quên mật khẩu'
  },
  code: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const listTemplateMd = (where, page, limit, populates, attr, sort) => {
  return TemplateMd.find({ where, page, limit, populates, attr, sort });
};

export const countTemplateMd = (where) => {
  return TemplateMd.count({ where });
};

export const detailTemplateMd = (where, populates, attr) => {
  return TemplateMd.findOne({ where, populates, attr });
};

export const createTemplateMd = (attr) => {
  return TemplateMd.create({ attr });
};

export const updateTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const updateManyTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const deleteTemplateMd = (where) => {
  return TemplateMd.delete({ where });
};
