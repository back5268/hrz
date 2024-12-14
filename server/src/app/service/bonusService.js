import { createBonusValid, detailBonusValid, listBonusValid, updateBonusValid } from '@lib/validation';
import { countBonusMd, createBonusMd, deleteBonusMd, detailBonusMd, detailSalaryMd, listBonusMd, updateBonusMd } from '@repository';
import { validateData } from '@utils';

export const getListBonusService = async (req) => {
  const { error, value } = validateData(listBonusValid, req.query);
  if (error) throw new Error(error);
  const { page, limit, keySearch, month, department, account, type } = value;
  const where = {};
  if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
  if (month) where.month = month;
  if (type) where.type = type;
  if (department) where.departments = { $elemMatch: { $eq: department } };
  if (account) where.accounts = { $elemMatch: { $eq: account } };
  const documents = await listBonusMd(where, page, limit);
  const total = await countBonusMd(where);
  return { documents, total };
};

export const deleteBonusService = async (req) => {
  const { error, value } = validateData(detailBonusValid, req.body);
  if (error) throw new Error(error);
  const { _id } = value;
  const data = await detailBonusMd({ _id });
  if (!data) throw new Error('Khoản thưởng không tồn tại!');
  const salary = await detailSalaryMd({ bonuses: { $elemMatch: { _id } } });
  if (salary) throw new Error('Khoản thưởng đã được áp dụng tính lương không thể xóa!');
  return await deleteBonusMd({ _id });
};

export const detailBonusService = async (req) => {
  const { error, value } = validateData(detailBonusValid, req.query);
  if (error) throw new Error(error);
  const { _id } = value;
  const data = await detailBonusMd({ _id });
  if (!data) throw new Error('Khoản thưởng không tồn tại!');
  return data;
};

export const updateBonusService = async (req) => {
  const { error, value } = validateData(updateBonusValid, req.body);
  if (error) throw new Error(error);
  let { _id, type, value: valuez } = value;
  const dataz = await detailBonusMd({ _id });
  if (!dataz) throw new Error('Khoản thưởng không tồn tại!');
  type = type ? type : dataz.type;
  valuez = valuez ? valuez : dataz.value;
  if (type === 2 && valuez > 100) if (!data) throw new Error('Khoản thưởng theo % lương cơ bản giá trị không thể lớn hơn 100!');
  const salary = await detailSalaryMd({ bonuses: { $elemMatch: { _id } } });
  if (salary) throw new Error('Khoản thưởng đã được áp dụng tính lương không thể cập nhật!');
  const data = await updateBonusMd({ _id }, { updatedBy: req.account._id, ...value });
  return data;
};

export const createBonusService = async (req) => {
  const { error, value } = validateData(createBonusValid, req.body);
  if (error) throw new Error(error);
  const { type, value: valuez } = value;
  if (type === 2 && valuez > 100) throw new Error('Khoản thưởng theo % lương cơ bản giá trị không thể lớn hơn 100!');
  const data = await createBonusMd({ updatedBy: req.account._id, ...value });
  return data
};
