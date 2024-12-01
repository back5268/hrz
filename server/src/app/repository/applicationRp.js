import { ApplicationMd } from "@models";

export const listApplicationMd = (where, page, limit, populates, attr, sort) => {
  return ApplicationMd.find({ where, page, limit, populates, attr, sort });
};

export const countApplicationMd = (where) => {
  return ApplicationMd.count({ where });
};

export const detailApplicationMd = (where, populates, attr) => {
  return ApplicationMd.findOne({ where, populates, attr });
};

export const createApplicationMd = (attr) => {
  return ApplicationMd.create({ attr });
};

export const updateApplicationMd = (where, attr) => {
  return ApplicationMd.update({ where, attr });
};

export const updateManyApplicationMd = (where, attr) => {
  return ApplicationMd.update({ where, attr });
};

export const deleteApplicationMd = (where) => {
  return ApplicationMd.delete({ where });
};

export const aggregateApplicationMd = (aggregate) => {
  return ApplicationMd.aggregate({ aggregate });
};
