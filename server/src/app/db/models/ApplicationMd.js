import { ModelBase } from '@config';

class ApplicationMd extends ModelBase {}

ApplicationMd.init('Application', {
  updatedBy: { type: String },
  department: { type: String, required: true },
  account: { type: String, required: true },
  shift: { type: String, required: true },
  type: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6],
    description:
      '1: Đơn xin nghỉ (phép năm), 2: Đơn xin nghỉ (không phép) 3: Đơn xác nhận công, 4: Đơn xin đi trễ, về sớm, 5: Đơn OT, 6: Đơn công tác'
  },
  detail: { type: Object, required: true },
  reason: { type: String, required: true },
  files: [{ type: String }],
  status: { type: Number, enum: [1, 2, 3, 4], description: '1: Chờ duyệt, 2: Đã duyệt, 3: Từ chối, 4: Hủy' },
  deletedAt: { type: Date }
});

export const listApplicationMd = (where, page, limit, populates, attr, sort) => {
  return ApplicationMd.find({ where, page, limit, populates, attr, sort });
};

export const countApplicationMd = (where) => {
  return ApplicationMd.count({ where });
};

export const detailApplicationMd = (where, populates, attr) => {
  return ApplicationMd.findOne({ where, populates, attr });
};

export const createApplicationMd = (attr) => {
  return ApplicationMd.create({ attr });
};

export const updateApplicationMd = (where, attr) => {
  return ApplicationMd.update({ where, attr });
};

export const updateManyApplicationMd = (where, attr) => {
  return ApplicationMd.update({ where, attr });
};

export const deleteApplicationMd = (where) => {
  return ApplicationMd.delete({ where });
};
