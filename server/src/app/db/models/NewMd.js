import { ModelBase } from '@config';

export class NewMd extends ModelBase {}

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
