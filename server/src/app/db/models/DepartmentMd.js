import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class DepartmentMd extends ModelBase {}

DepartmentMd.init('Department', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  manager: { type: ObjectId, ref: 'Account' },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});

export const listDepartmentMd = (where, page, limit, populates, attr, sort) => {
  return DepartmentMd.find({ where, page, limit, populates, attr, sort });
};

export const countDepartmentMd = (where) => {
  return DepartmentMd.count({ where });
};

export const detailDepartmentMd = (where, populates, attr) => {
  return DepartmentMd.findOne({ where, populates, attr });
};

export const createDepartmentMd = (attr) => {
  return DepartmentMd.create({ attr });
};

export const updateDepartmentMd = (where, attr) => {
  return DepartmentMd.update({ where, attr });
};

export const updateManyDepartmentMd = (where, attr) => {
  return DepartmentMd.update({ where, attr });
};

export const deleteDepartmentMd = (where) => {
  return DepartmentMd.delete({ where });
};
