import { createPositionValid, detailPositionValid, listPositionValid, updatePositionValid } from '@lib/validation';
import { countPositionMd, createPositionMd, deletePositionMd, detailPositionMd, listPositionMd, updatePositionMd } from '@models';
import { validateData } from '@utils';

export const getListPosition = async (req, res) => {
  const { error, value } = validateData(listPositionValid, req.query);
  if (error) return res.status(400).json({ status: 0, mess: error });
  const { page, limit, keySearch, status } = value;
  const where = {};
  if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
  if (status) where.status = status;
  const documents = await listPositionMd(where, page, limit);
  const total = await countPositionMd(where);
  res.json({ status: 1, data: { documents, total } });
};

export const deletePosition = async (req, res) => {
  try {
    const { error, value } = validateData(detailPositionValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deletePositionMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Chức vụ không tồn tại!' });
    if (data.key) return res.status(400).json({ status: 0, mess: 'Chức vụ cơ bản không thể xóa!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailPosition = async (req, res) => {
  try {
    const { error, value } = validateData(detailPositionValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailPositionMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Chức vụ không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const { error, value } = validateData(updatePositionValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, name, code } = value;

    const dataz = await detailPositionMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Chức vụ không tồn tại!' });

    if (name) {
      const checkName = await detailPositionMd({ name });
      if (checkName) return res.status(400).json({ status: 0, mess: 'Tên chức vụ đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailPositionMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã chức vụ đã tồn tại!' });
    }

    const data = await updatePositionMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createPosition = async (req, res) => {
  try {
    const { error, value } = validateData(createPositionValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { name, code } = value;

    if (name) {
      const checkName = await detailPositionMd({ name });
      if (checkName) return res.status(400).json({ status: 0, mess: 'Tên chức vụ đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailPositionMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã chức vụ đã tồn tại!' });
    }

    const data = await createPositionMd({ by: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
