import { ModelBase } from '@config';

class PositionMd extends ModelBase {}

PositionMd.init('Position', {
  by: { type: String },
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  key: { type: String },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});

export const listPositionMd = (where, page, limit, populates, attr, sort) => {
  return PositionMd.find({ where, page, limit, populates, attr, sort });
};

export const countPositionMd = (where) => {
  return PositionMd.count({ where });
};

export const detailPositionMd = (where, populates, attr) => {
  return PositionMd.findOne({ where, populates, attr });
};

export const createPositionMd = (attr) => {
  return PositionMd.create({ attr });
};

export const updatePositionMd = (where, attr) => {
  return PositionMd.update({ where, attr });
};

export const updateManyPositionMd = (where, attr) => {
  return PositionMd.update({ where, attr });
};

export const deletePositionMd = (where) => {
  return PositionMd.delete({ where });
};
