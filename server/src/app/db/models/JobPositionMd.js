import { ModelBase } from '@config';

class JobPositionMd extends ModelBase {}

JobPositionMd.init('JobPosition', {
  by: { type: String },
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});

export const listJobPositionMd = (where, page, limit, populates, attr, sort) => {
  return JobPositionMd.find({ where, page, limit, populates, attr, sort });
};

export const countJobPositionMd = (where) => {
  return JobPositionMd.count({ where });
};

export const detailJobPositionMd = (where, populates, attr) => {
  return JobPositionMd.findOne({ where, populates, attr });
};

export const createJobPositionMd = (attr) => {
  return JobPositionMd.create({ attr });
};

export const updateJobPositionMd = (where, attr) => {
  return JobPositionMd.update({ where, attr });
};

export const updateManyJobPositionMd = (where, attr) => {
  return JobPositionMd.update({ where, attr });
};

export const deleteJobPositionMd = (where) => {
  return JobPositionMd.delete({ where });
};
