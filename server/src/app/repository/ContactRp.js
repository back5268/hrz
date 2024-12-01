import { ContactMd } from "@models";

export const listContactMd = (where, page, limit, populates, attr, sort) => {
  return ContactMd.find({ where, page, limit, populates, attr, sort });
};

export const countContactMd = (where) => {
  return ContactMd.count({ where });
};

export const detailContactMd = (where, populates, attr) => {
  return ContactMd.findOne({ where, populates, attr });
};

export const createContactMd = (attr) => {
  return ContactMd.create({ attr });
};

export const updateContactMd = (where, attr) => {
  return ContactMd.update({ where, attr });
};

export const updateManyContactMd = (where, attr) => {
  return ContactMd.update({ where, attr });
};

export const deleteContactMd = (where) => {
  return ContactMd.delete({ where });
};
