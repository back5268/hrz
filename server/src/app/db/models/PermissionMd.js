import { ModelBase } from "@config";

export class PermissionMd extends ModelBase {}

PermissionMd.init('Permission', {
  updatedBy: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  departments: [{ type: String }],
  positions: [{ type: String }],
  tools: [{ route: { type: String, required: true }, actions: { type: Array, required: true } }],
  deletedAt: { type: Date }
});
