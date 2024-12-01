import { ContractMd } from "@models";

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
