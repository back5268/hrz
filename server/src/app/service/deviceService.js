import { createDeviceValid, detailDeviceValid, listDeviceValid, updateDeviceValid } from '@lib/validation';
import { countDeviceMd, createDeviceMd, deleteDeviceMd, detailDeviceMd, listDeviceMd, updateDeviceMd } from '@models';
import { validateData } from '@utils';

export const getListDevice = async (req, res) => {
  try {
    const { error, value } = validateData(listDeviceValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, type, department, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    if (department) where.departments = { $elemMatch: { $eq: department } };
    const documents = await listDeviceMd(where, page, limit);
    const total = await countDeviceMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { error, value } = validateData(detailDeviceValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteDeviceMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Thiết bị không tồn tại!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailDevice = async (req, res) => {
  try {
    const { error, value } = validateData(detailDeviceValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailDeviceMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Thiết bị không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { error, value } = validateData(updateDeviceValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, name, code } = value;
    const dataz = await detailDeviceMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Thiết bị không tồn tại!' });
    if (name) {
      const checkName = await detailDeviceMd({ name });
      if (checkName) return res.json({ status: 0, mess: 'Tên thiết bị đã tồn tại!' });
    }
    if (code) {
      const checkCode = await detailDeviceMd({ code });
      if (checkCode) return res.json({ status: 0, mess: 'Mã thiết bị đã tồn tại!' });
    }
    const data = await updateDeviceMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createDevice = async (req, res) => {
  try {
    const { error, value } = validateData(createDeviceValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { name, code } = value;
    const checkName = await detailDeviceMd({ name });
    if (checkName) return res.json({ status: 0, mess: 'Tên thiết bị đã tồn tại!' });
    const checkCode = await detailDeviceMd({ code });
    if (checkCode) return res.json({ status: 0, mess: 'Mã thiết bị đã tồn tại!' });
    const data = await createDeviceMd({ updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
