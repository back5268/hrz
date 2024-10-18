import { ModelBase } from "@config";

class NotifyMd extends ModelBase {}

NotifyMd.init('Notify', {
  fromBy: {
    type: Number,
    enum: [1, 2],
    required: true,
    description: '1: Thông báo từ hệ thống, 2: Thông báo từ người dùng'
  },
  by: { type: String },
  to: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
    description: '0: Chưa xem, 1: Xem nhưng chưa đọc, 2: Đã đọc'
  },
  data: { type: Object },
  deletedAt: { type: Date }
});

export const listNotifyMd = (where, page, limit, populates, attr, sort) => {
  return NotifyMd.find({ where, page, limit, populates, attr, sort });
};

export const countNotifyMd = (where) => {
  return NotifyMd.count({ where });
};

export const detailNotifyMd = (where, populates, attr) => {
  return NotifyMd.findOne({ where, populates, attr });
};

export const createNotifyMd = (attr) => {
  return NotifyMd.create({ attr });
};

export const updateNotifyMd = (where, attr) => {
  return NotifyMd.update({ where, attr });
};

export const updateManyNotifyMd = (where, attr) => {
  return NotifyMd.update({ where, attr });
};

export const deleteNotifyMd = (where) => {
  return NotifyMd.delete({ where });
};
