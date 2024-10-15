import { createShiftValid, detailShiftValid, listShiftValid, updateShiftValid } from '@lib/validation';
import { countShiftMd, createShiftMd, deleteShiftMd, detailShiftMd, listShiftMd, updateManyScheduleMd, updateShiftMd } from '@models';
import { createScheduleByShift } from '@repository';
import { validateData } from '@utils';

export const getListShift = async (req, res) => {
  try {
    const { error, value } = validateData(listShiftValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { page, limit, keySearch, department, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (department) where.departments = { $elemMatch: { $eq: department } };
    const documents = await listShiftMd(where, page, limit);
    const total = await countShiftMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListShiftInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listShiftMd({}) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const { error, value } = validateData(detailShiftValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteShiftMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    await updateManyScheduleMd({ shift: _id, date: { $gte: new Date() } }, { deletedAt: new Date() });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailShift = async (req, res) => {
  try {
    const { error, value } = validateData(detailShiftValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailShiftMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateShift = async (req, res) => {
  try {
    const { error, value } = validateData(updateShiftValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, name, code } = value;
    const dataz = await detailShiftMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    if (name) {
      const checkName = await detailShiftMd({ name });
      if (checkName) return res.status(400).json({ status: 0, mess: 'Tên ca làm việc đã tồn tại!' });
    }
    if (code) {
      const checkCode = await detailShiftMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã ca làm việc đã tồn tại!' });
    }
    const data = await updateShiftMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createShift = async (req, res) => {
  try {
    const { error, value } = validateData(createShiftValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { name, code, dateStart } = value;
    const checkName = await detailShiftMd({ name });
    if (checkName) return res.status(400).json({ status: 0, mess: 'Tên ca làm việc đã tồn tại!' });
    const checkCode = await detailShiftMd({ code });
    if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã ca làm việc đã tồn tại!' });
    if (new Date(dateStart) < new Date()) return res.status(400).json({ status: 0, mess: 'Ngày áp dụng không được nhỏ hơn hiện tại!' });
    const data = await createShiftMd({ updatedBy: req.account._id, ...value });
    await createScheduleByShift(data);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListShiftApp = async (req, res) => {
  try {
    const where = { departments: { $elemMatch: { $eq: req.account?.department } }, status: 1 };
    res.json({ status: 1, data: await listShiftMd(where) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
