import { createNotifyValid, detailNotifyValid, listNotifyValid, updateNotifyValid } from '@lib/validation';
import { countNotifyMd, createNotifyMd, deleteNotifyMd, detailNotifyMd, listNotifyMd, updateNotifyMd } from '@models';
import { validateData } from '@utils';

export const getListNotify = async (req, res) => {
  try {
    const { error, value } = validateData(listNotifyValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listNotifyMd(where, page, limit);
    const total = await countNotifyMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteNotify = async (req, res) => {
  try {
    const { error, value } = validateData(detailNotifyValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteNotifyMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Thông báo không tồn tại!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailNotify = async (req, res) => {
  try {
    const { error, value } = validateData(detailNotifyValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailNotifyMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Thông báo không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateNotify = async (req, res) => {
  try {
    const { error, value } = validateData(updateNotifyValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, subject } = value;
    const dataz = await detailNotifyMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Thông báo không tồn tại!' });
    if (subject) {
      const checkSubject = await detailNotifyMd({ subject });
      if (checkSubject) return res.status(400).json({ status: 0, mess: 'Tiêu đề đã tồn tại!' });
    }
    if (req.files?.['files']?.length > 0) {
      value.files = Array.isArray(value.files) ? value.files : [];
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await updateNotifyMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createNotify = async (req, res) => {
  try {
    const { error, value } = validateData(createNotifyValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { subject } = value;
    const checkSubject = await detailNotifyMd({ subject });
    if (checkSubject) return res.status(400).json({ status: 0, mess: 'Tiêu đề đã tồn tại!' });
    value.files = [];
    if (req.files?.['files']?.length > 0) {
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await createNotifyMd({ updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
