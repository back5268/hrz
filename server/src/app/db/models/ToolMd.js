import { ModelBase } from '@config';

export class ToolMd extends ModelBase {}

ToolMd.init('Tool', {
  name: { type: String, required: true },
  sort: { type: Number, required: true },
  icon: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  items: [
    {
      name: { type: String, require: true },
      showSidebar: { type: Boolean, default: true },
      route: { type: String, require: true },
      actions: [{ type: String, require: true }]
    }
  ],
  deletedAt: { type: Date }
});
