import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TaxSetupMd extends ModelBase {}

TaxSetupMd.init('TaxSetup', {
  by: { type: ObjectId, ref: 'Account', required: true },
  updateBy: { type: ObjectId, ref: 'Account' },
  self: { type: Number, min: 0 },
  dependent: { type: Number, min: 0 },
  rate: [{ from: Number, to: Number, amount: Number, note: String }],
  before: { type: Object },
  note: { type: String },
  files: [{ type: String }],
  deletedAt: { type: Date }
});

export const listTaxSetupMd = (where, page, limit, populates, attr, sort) => {
  return TaxSetupMd.find({ where, page, limit, populates, attr, sort });
};

export const countTaxSetupMd = (where) => {
  return TaxSetupMd.count({ where });
};

export const detailTaxSetupMd = (where, populates, attr) => {
  return TaxSetupMd.findOne({ where, populates, attr });
};

export const createTaxSetupMd = (attr) => {
  return TaxSetupMd.create({ attr });
};

export const updateTaxSetupMd = (where, attr) => {
  return TaxSetupMd.update({ where, attr });
};

export const updateManyTaxSetupMd = (where, attr) => {
  return TaxSetupMd.update({ where, attr });
};

export const deleteTaxSetupMd = (where) => {
  return TaxSetupMd.delete({ where });
};
