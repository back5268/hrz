import { ModelBase } from '@config';

class LogMd extends ModelBase {}

LogMd.init('Log', {
  to: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2],
    required: true,
    description: '1: Quên mật khẩu, 2: Gửi phiếu lương'
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    description: '0: Đang gửi, 1: Đã gửi, 2: Có lỗi'
  },
  mess: { type: String },
  deletedAt: { type: Date }
});

export const listLogMd = (where, page, limit, populates, attr, sort) => {
  return LogMd.find({ where, page, limit, populates, attr, sort });
};

export const countLogMd = (where) => {
  return LogMd.count({ where });
};

export const detailLogMd = (where, populates, attr) => {
  return LogMd.findOne({ where, populates, attr });
};

export const createLogMd = (attr) => {
  return LogMd.create({ attr });
};

export const updateLogMd = (where, attr) => {
  return LogMd.update({ where, attr });
};

export const updateManyLogMd = (where, attr) => {
  return LogMd.update({ where, attr });
};

export const deleteLogMd = (where) => {
  return LogMd.delete({ where });
};
