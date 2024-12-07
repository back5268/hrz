import { createDepartmentValid, detailDepartmentValid, listDepartmentValid, updateDepartmentValid } from '@lib/validation';
import {
  countDepartmentMd,
  createDepartmentMd,
  deleteDepartmentMd,
  detailDepartmentMd,
  listAccountMd,
  listDepartmentMd,
  updateDepartmentMd
} from '@repository';
import { validateData } from '@utils';

export const getListDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(listDepartmentValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listDepartmentMd(where, page, limit);
    const total = await countDepartmentMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListDepartmentInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listDepartmentMd({ status: 1 }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailDepartmentValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailDepartmentMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phòng ban không tồn tại!' });
    const accounts = await listAccountMd({ department: _id, status: 1 });
    if (accounts?.length > 0) res.json({ status: 0, mess: 'Phòng ban có nhân viên đang làm việc, không thể xóa!' });
    res.status(201).json({ status: 1, data: await deleteDepartmentMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailDepartmentValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailDepartmentMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phòng ban không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(updateDepartmentValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, name, code } = value;
    const dataz = await detailDepartmentMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Phòng ban không tồn tại!' });
    if (name) {
      const checkName = await detailDepartmentMd({ name });
      if (checkName) return res.json({ status: 0, mess: 'Tên phòng ban đã tồn tại!' });
    }
    if (code) {
      const checkCode = await detailDepartmentMd({ code });
      if (checkCode) return res.json({ status: 0, mess: 'Mã phòng ban đã tồn tại!' });
    }
    const data = await updateDepartmentMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(createDepartmentValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { name, code } = value;
    const checkName = await detailDepartmentMd({ name });
    if (checkName) return res.json({ status: 0, mess: 'Tên phòng ban đã tồn tại!' });
    const checkCode = await detailDepartmentMd({ code });
    if (checkCode) return res.json({ status: 0, mess: 'Mã phòng ban đã tồn tại!' });
    const data = await createDepartmentMd({ updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
