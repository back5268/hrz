import { ModelBase } from '@config';

export class EducationMd extends ModelBase {}

EducationMd.init('Education', {
  account: { type: String, required: true },
  qualification: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description:
      'Trình độ học vấn; 1: Trên đại học, 2: Đại học, 3: Cao đẳng, 4: Trung cấp, 5: Sơ cấp, 6: Sinh viên, 7: Khác'
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
  healthFiles: [{ type: String }],
  deletedAt: { type: Date }
});
