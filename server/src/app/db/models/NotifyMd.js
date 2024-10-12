import { ModelBase } from '@config';

class NotifyMd extends ModelBase {}

NotifyMd.init('Notify', {
  updatedBy: { type: String },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  files: [{ type: String }],
  departments: [{ type: String }],
  accounts: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1 },
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
