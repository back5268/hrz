import { uploadFileToFirebase } from '@lib/firebase';
import { createNewValid, detailNewValid, listNewValid, updateNewValid } from '@lib/validation';
import { countNewMd, createNewMd, deleteNewMd, detailNewMd, listNewMd, updateNewMd } from '@models';
import { validateData } from '@utils';

export const getListNew = async (req, res) => {
  try {
    const { error, value } = validateData(listNewValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listNewMd(where, page, limit);
    const total = await countNewMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListNewApp = async (req, res) => {
  try {
    res.json({ status: 1, data: await listNewMd({ status: 1, departments: { $elemMatch: { $eq: req.account.department?._id } } }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteNew = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteNewMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Tin tức không tồn tại!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailNew = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailNewMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Tin tức không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateNew = async (req, res) => {
  try {
    const { error, value } = validateData(updateNewValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, subject } = value;
    const dataz = await detailNewMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Tin tức không tồn tại!' });
    if (subject) {
      const checkSubject = await detailNewMd({ subject });
      if (checkSubject) return res.json({ status: 0, mess: 'Tiêu đề đã tồn tại!' });
    }
    if (req.files?.['avatar']?.length > 0) {
      for (const file of req.files['avatar']) {
        value.avatar = await uploadFileToFirebase(file);
      }
    }
    if (req.files?.['files']?.length > 0) {
      value.files = Array.isArray(value.files) ? value.files : [];
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await updateNewMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createNew = async (req, res) => {
  try {
    const { error, value } = validateData(createNewValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { subject } = value;
    const checkSubject = await detailNewMd({ subject });
    if (checkSubject) return res.json({ status: 0, mess: 'Tiêu đề đã tồn tại!' });
    value.files = [];
    if (req.files?.['avatar']?.length > 0) {
      for (const file of req.files['avatar']) {
        value.avatar = await uploadFileToFirebase(file);
      }
    }
    if (req.files?.['files']?.length > 0) {
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await createNewMd({ updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
