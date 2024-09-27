import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class RequestMd extends ModelBase {}

RequestMd.init('Request', {
  department: { type: ObjectId, ref: 'Department', required: true },
  account: { type: ObjectId, ref: 'Account', required: true },
  shift: { type: ObjectId, ref: 'Shift', required: true },
  type: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
    description: '1: Đơn nghỉ phép, 2: Đơn xác nhận công, 3: Đơn đi trễ, về sớm, 4: Đơn OT, 5: Đơn công tác, 6: Đơn đổi ca'
  },
  reason: { type: String, required: true },
  files: [{ type: String, required: true }],
  status: { type: Number, enum: [1, 2, 3, 4], description: '1: Chờ duyệt, 2: Đã duyệt, 3: Từ chối, 4: Hủy' },
  deletedAt: { type: Date }
});

export const listRequestMd = (where, page, limit, populates, attr, sort) => {
  return RequestMd.find({ where, page, limit, populates, attr, sort });
};

export const countRequestMd = (where) => {
  return RequestMd.count({ where });
};

export const detailRequestMd = (where, populates, attr) => {
  return RequestMd.findOne({ where, populates, attr });
};

export const createRequestMd = (attr) => {
  return RequestMd.create({ attr });
};

export const updateRequestMd = (where, attr) => {
  return RequestMd.update({ where, attr });
};

export const updateManyRequestMd = (where, attr) => {
  return RequestMd.update({ where, attr });
};

export const deleteRequestMd = (where) => {
  return RequestMd.delete({ where });
};
