import { JobPositionMd } from "@models";

export const listJobPositionMd = (where, page, limit, populates, attr, sort) => {
  return JobPositionMd.find({ where, page, limit, populates, attr, sort });
};

export const countJobPositionMd = (where) => {
  return JobPositionMd.count({ where });
};

export const detailJobPositionMd = (where, populates, attr) => {
  return JobPositionMd.findOne({ where, populates, attr });
};

export const createJobPositionMd = (attr) => {
  return JobPositionMd.create({ attr });
};

export const updateJobPositionMd = (where, attr) => {
  return JobPositionMd.update({ where, attr });
};

export const updateManyJobPositionMd = (where, attr) => {
  return JobPositionMd.update({ where, attr });
};

export const deleteJobPositionMd = (where) => {
  return JobPositionMd.delete({ where });
};
