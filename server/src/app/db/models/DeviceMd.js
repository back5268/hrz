import { ModelBase } from '@config';

class DeviceMd extends ModelBase {}

DeviceMd.init('Device', {
  updatedBy: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: Number, required: true, enum: [1, 2, 3], description: '1: Chấm công khuôn mặt, 2: Chấm công vân tay, 3: Chấm công thẻ từ' },
  ipAddress: { type: String },
  departments: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: { type: Date }
});

export const listDeviceMd = (where, page, limit, populates, attr, sort) => {
  return DeviceMd.find({ where, page, limit, populates, attr, sort });
};

export const countDeviceMd = (where) => {
  return DeviceMd.count({ where });
};

export const detailDeviceMd = (where, populates, attr) => {
  return DeviceMd.findOne({ where, populates, attr });
};

export const createDeviceMd = (attr) => {
  return DeviceMd.create({ attr });
};

export const updateDeviceMd = (where, attr) => {
  return DeviceMd.update({ where, attr });
};

export const updateManyDeviceMd = (where, attr) => {
  return DeviceMd.update({ where, attr });
};

export const deleteDeviceMd = (where) => {
  return DeviceMd.delete({ where });
};
