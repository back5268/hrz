import { createShiftValid, detailShiftValid, listShiftValid, updateShiftValid } from '@lib/validation';
import {
  countShiftMd,
  createShiftMd,
  deleteShiftMd,
  deleteTimekeepingMd,
  detailShiftMd,
  listShiftMd,
  updateShiftMd
} from '@repository';
import { createTimekeepingByShift } from '@service';
import { validateData } from '@utils';
import moment from 'moment';

export const getListShift = async (req, res) => {
  try {
    const { error, value } = validateData(listShiftValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
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
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteShiftMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailShift = async (req, res) => {
  try {
    const { error, value } = validateData(detailShiftValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailShiftMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateShift = async (req, res) => {
  try {
    const { error, value } = validateData(updateShiftValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, name, code, dateEnd } = value;
    const dataz = await detailShiftMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    if (name) {
      const checkName = await detailShiftMd({ name });
      if (checkName) return res.json({ status: 0, mess: 'Tên ca làm việc đã tồn tại!' });
    }
    if (code) {
      const checkCode = await detailShiftMd({ code });
      if (checkCode) return res.json({ status: 0, mess: 'Mã ca làm việc đã tồn tại!' });
    }
    const data = await updateShiftMd({ _id }, { updatedBy: req.account._id, name, code, dateEnd });
    if (dateEnd) {
      if (new Date(dateEnd) > new Date(dataz.dateEnd))
        createTimekeepingByShift({ ...dataz, dateStart: moment(dataz.dateStart).add(1, 'days').format('YYYY-MM-DD'), dateEnd });
      else await deleteTimekeepingMd({ shift: _id, date: { $gt: dateEnd } });
    }
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createShift = async (req, res) => {
  try {
    const { error, value } = validateData(createShiftValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { name, code } = value;
    const checkName = await detailShiftMd({ name });
    if (checkName) return res.json({ status: 0, mess: 'Tên ca làm việc đã tồn tại!' });
    const checkCode = await detailShiftMd({ code });
    if (checkCode) return res.json({ status: 0, mess: 'Mã ca làm việc đã tồn tại!' });
    const data = await createShiftMd({ updatedBy: req.account._id, ...value });
    await createTimekeepingByShift(data);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListShiftApp = async (req, res) => {
  try {
    const where = { departments: { $elemMatch: { $eq: req.account?.department?._id } }, status: 1 };
    const data = await listShiftMd(where)
    res.json({ status: 1, data });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
