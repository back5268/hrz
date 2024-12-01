import { ModelBase } from '@config';

export class WorkHistoryMd extends ModelBase {}

WorkHistoryMd.init('WorkHistory', {
  by: { type: String, required: true },
  account: { type: String, required: true },
  before: { type: Object },
  after: { type: Object },
  note: [{ type: String }],
  deletedAt: { type: Date }
});
