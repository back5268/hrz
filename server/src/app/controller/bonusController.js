import { createBonusValid, detailBonusValid, listBonusValid, updateBonusValid } from '@lib/validation';
import {
  countBonusMd,
  createBonusMd,
  deleteBonusMd,
  detailBonusMd,
  detailSalaryMd,
  listBonusMd,
  updateBonusMd
} from '@models';
import { validateData } from '@utils';

export const getListBonus = async (req, res) => {
  try {
    const { error, value } = validateData(listBonusValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, month, department, account, type } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (month) where.month = month;
    if (type) where.type = type;
    if (department) where.departments = { $elemMatch: { $eq: department } };
    if (account) where.accounts = { $elemMatch: { $eq: account } };
    const documents = await listBonusMd(where, page, limit);
    const total = await countBonusMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteBonus = async (req, res) => {
  try {
    const { error, value } = validateData(detailBonusValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailBonusMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Khoản thưởng không tồn tại!' });
    const salary = await detailSalaryMd({ bonuses: { $elemMatch: { $eq: _id } } });
    if (salary) return res.json({ status: 0, mess: 'Khoản thưởng đã được áp dụng tính lương không thể xóa!' });
    res.status(201).json({ status: 1, data: await deleteBonusMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailBonus = async (req, res) => {
  try {
    const { error, value } = validateData(detailBonusValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailBonusMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Khoản thưởng không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateBonus = async (req, res) => {
  try {
    const { error, value } = validateData(updateBonusValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    let { type, value: valuez } = value;
    const dataz = await detailBonusMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Khoản thưởng không tồn tại!' });
    type = type ? type : dataz.type
    valuez = valuez ? valuez : dataz.value
    if (type === 2 && valuez > 100) return res.json({ status: 0, mess: 'Khoản thưởng theo % lương cơ bản giá trị không thể lớn hơn 100!' });
    const salary = await detailSalaryMd({ bonuses: { $elemMatch: { $eq: _id } } });
    if (salary) return res.json({ status: 0, mess: 'Khoản thưởng đã được áp dụng tính lương không thể cập nhật!' });
    const data = await updateBonusMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createBonus = async (req, res) => {
  try {
    const { error, value } = validateData(createBonusValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { type, value: valuez } = value;
    if (type === 2 && valuez > 100) return res.json({ status: 0, mess: 'Khoản thưởng theo % lương cơ bản giá trị không thể lớn hơn 100!' });
    const data = await createBonusMd({ updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
