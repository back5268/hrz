import { ModelBase } from '@config';

class PositionMd extends ModelBase {}

PositionMd.init('Position', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  allowances: [
    {
      name: String,
      amount: Number,
      type: { type: Number, enum: [1, 2], description: '1: Trợ cấp theo tháng, 2: Trợ cấp theo ngày làm việc thực tế' }
    }
  ],
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
