import { ModelBase } from '@config';

class NewMd extends ModelBase {}

NewMd.init('New', {
  updatedBy: { type: String },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String },
  description: { type: String },
  files: [{ type: String }],
  departments: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const listNewMd = (where, page, limit, populates, attr, sort) => {
  return NewMd.find({ where, page, limit, populates, attr, sort });
};

export const countNewMd = (where) => {
  return NewMd.count({ where });
};

export const detailNewMd = (where, populates, attr) => {
  return NewMd.findOne({ where, populates, attr });
};

export const createNewMd = (attr) => {
  return NewMd.create({ attr });
};

export const updateNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const updateManyNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const deleteNewMd = (where) => {
  return NewMd.delete({ where });
};
