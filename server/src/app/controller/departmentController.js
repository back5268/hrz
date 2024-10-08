import { createDepartmentValid, detailDepartmentValid, listDepartmentValid, updateDepartmentValid } from '@lib/validation';
import { countDepartmentMd, createDepartmentMd, deleteDepartmentMd, detailDepartmentMd, listDepartmentMd, updateDepartmentMd } from '@models';
import { validateData } from '@utils';

export const getListDepartment = async (req, res) => {
  const { error, value } = validateData(listDepartmentValid, req.query);
  if (error) return res.status(400).json({ status: 0, mess: error });
  const { page, limit, keySearch, status } = value;
  const where = {};
  if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
  if (status) where.status = status;
  const documents = await listDepartmentMd(where, page, limit);
  const total = await countDepartmentMd(where);
  res.json({ status: 1, data: { documents, total } });
};

export const deleteDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailDepartmentValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteDepartmentMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Phòng ban không tồn tại!' });
    if (data.key) return res.status(400).json({ status: 0, mess: 'Phòng ban cơ bản không thể xóa!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailDepartmentValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailDepartmentMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Phòng ban không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(updateDepartmentValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, name, code } = value;

    const dataz = await detailDepartmentMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Phòng ban không tồn tại!' });

    if (name) {
      const checkName = await detailDepartmentMd({ name });
      if (checkName) return res.status(400).json({ status: 0, mess: 'Tên phòng ban đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailDepartmentMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã phòng ban đã tồn tại!' });
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
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { name, code } = value;

    if (name) {
      const checkName = await detailDepartmentMd({ name });
      if (checkName) return res.status(400).json({ status: 0, mess: 'Tên phòng ban đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailDepartmentMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã phòng ban đã tồn tại!' });
    }

    const data = await createDepartmentMd({ by: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
