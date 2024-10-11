import { createJobPositionValid, detailJobPositionValid, listJobPositionValid, updateJobPositionValid } from '@lib/validation';
import {
  countJobPositionMd,
  createJobPositionMd,
  deleteJobPositionMd,
  detailJobPositionMd,
  listJobPositionMd,
  updateJobPositionMd
} from '@models';
import { validateData } from '@utils';

export const getListJobPosition = async (req, res) => {
  try {
    const { error, value } = validateData(listJobPositionValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listJobPositionMd(where, page, limit);
    const total = await countJobPositionMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListJobPositionInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listJobPositionMd({ status: 1 }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteJobPosition = async (req, res) => {
  try {
    const { error, value } = validateData(detailJobPositionValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteJobPositionMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Vị trí công việc không tồn tại!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailJobPosition = async (req, res) => {
  try {
    const { error, value } = validateData(detailJobPositionValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailJobPositionMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Vị trí công việc không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateJobPosition = async (req, res) => {
  try {
    const { error, value } = validateData(updateJobPositionValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, name, code, minSalary, maxSalary } = value;
    const dataz = await detailJobPositionMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Vị trí công việc không tồn tại!' });
    if (typeof minSalary === 'number' || typeof maxSalary === 'number') {
      if ((typeof minSalary === 'number' ? minSalary : dataz.minSalary) > (typeof maxSalary === 'number' ? maxSalary : dataz.maxSalary))
        return res.status(400).json({ status: 0, mess: 'Mức lương tối thiểu không thể lớn hơn mức lương tối đa!' });
    }
    if (name) {
      const checkName = await detailJobPositionMd({ name });
      if (checkName) return res.status(400).json({ status: 0, mess: 'Tên vị trí công việc đã tồn tại!' });
    }
    if (code) {
      const checkCode = await detailJobPositionMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã vị trí công việc đã tồn tại!' });
    }
    const data = await updateJobPositionMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createJobPosition = async (req, res) => {
  try {
    const { error, value } = validateData(createJobPositionValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { name, code, minSalary, maxSalary } = value;
    if (minSalary > maxSalary) return res.status(400).json({ status: 0, mess: 'Mức lương tối thiểu không thể lớn hơn mức lương tối đa!' });
    const checkName = await detailJobPositionMd({ name });
    if (checkName) return res.status(400).json({ status: 0, mess: 'Tên vị trí công việc đã tồn tại!' });
    const checkCode = await detailJobPositionMd({ code });
    if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã vị trí công việc đã tồn tại!' });
    const data = await createJobPositionMd({ by: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
