import { ModelBase } from '@config';

class TemplateMd extends ModelBase {}

TemplateMd.init('Template', {
  updatedBy: { type: String },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    description:
      '1: Hợp đồng lao động, 2: Hợp đồng dịch vụ, 3: Hợp dồng thử việc, 4: Hợp đồng theo dự án, 5: Phiếu lương, 6: Quên mật khẩu, 7: Cảnh báo chấm công',
    required: true
  },
  subject: { type: String, required: true },
  content: { type: String },
  description: { type: String },
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
