import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class EducationMd extends ModelBase {}

EducationMd.init('Education', {
  account: { type: ObjectId, ref: 'Account', required: true },
  qualification: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description:
      'Trình độ học vấn; 1: Trên đại học, 2: Đại học, 3: Cao đẳng, 4: Trung cấp, 5: Sơ cấp, 6: Sinh viên, 7: 12/12, 8: 10/12, 9: 9/12, 10: Khác'
  },
  graduationType: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    description: 'Loại tốt nghiệp; 1: Xuất sắc, 2: Giỏi, 3: Khá, 4: TB Khá, 5: Trung bình, 6: Không xếp hạng, 7: Không'
  },
  major: { type: String },
  foreignLanguage: { type: String, description: 'Trình độ ngoại ngữ' },
  computerScience: { type: String, description: 'Trình độ tin học' },
  educationFiles: [{ type: String }],
  healthStatus: { type: String, description: 'Tình trạng sức khỏe' },
  pathology: { type: String, description: 'Bệnh lý' },
  height: { type: Number, description: 'Chiều cao' },
  weight: { type: Number, description: 'Cân nặng' },
  healthFiles: [{ type: String }],
  deletedAt: { type: Date }
});

export const listEducationMd = (where, page, limit, populates, attr, sort) => {
  return EducationMd.find({ where, page, limit, populates, attr, sort });
};

export const countEducationMd = (where) => {
  return EducationMd.count({ where });
};

export const detailEducationMd = (where, populates, attr) => {
  return EducationMd.findOne({ where, populates, attr });
};

export const createEducationMd = (attr) => {
  return EducationMd.create({ attr });
};

export const updateEducationMd = (where, attr) => {
  return EducationMd.update({ where, attr });
};

export const updateManyEducationMd = (where, attr) => {
  return EducationMd.update({ where, attr });
};

export const deleteEducationMd = (where) => {
  return EducationMd.delete({ where });
};
