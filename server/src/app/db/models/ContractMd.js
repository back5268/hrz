import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ContractMd extends ModelBase {}

ContractMd.init('Contract', {
  account: { type: ObjectId, ref: 'Account', required: true },
  code: { type: String, required: true },
  type: { type: Number, required: true, enum: [], description: '' },
  signedDate: { type: Date, required: true },
  expiredDate: { type: Date, required: true },
  note: { type: String },
  status: { type: Number, required: true, enum: [], description: '' },
  template: { type: String, required: true },
  deletedAt: { type: Date }
});

export const listContractMd = (where, page, limit, populates, attr, sort) => {
  return ContractMd.find({ where, page, limit, populates, attr, sort });
};

export const countContractMd = (where) => {
  return ContractMd.count({ where });
};

export const detailContractMd = (where, populates, attr) => {
  return ContractMd.findOne({ where, populates, attr });
};

export const createContractMd = (attr) => {
  return ContractMd.create({ attr });
};

export const updateContractMd = (where, attr) => {
  return ContractMd.update({ where, attr });
};

export const updateManyContractMd = (where, attr) => {
  return ContractMd.update({ where, attr });
};

export const deleteContractMd = (where) => {
  return ContractMd.delete({ where });
};
