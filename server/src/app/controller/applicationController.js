import { createApplicationValid, detailApplicationValid, listApplicationValid, updateApplicationValid } from '@lib/validation';
import { countApplicationMd, createApplicationMd, detailApplicationMd, listApplicationMd, updateApplicationMd } from '@models';
import { validateData } from '@utils';

export const getListApplication = async (req, res) => {
  try {
    const { error, value } = validateData(listApplicationValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { page, limit, status, department, account, type } = value;
    const where = {};
    if (status) where.status = status;
    if (department) where.department = department;
    if (account) where.account = account;
    if (type) where.type = type;
    const documents = await listApplicationMd(where, page, limit);
    const total = await countApplicationMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListApplicationApp = async (req, res) => {
  try {
    const { error, value } = validateData(listApplicationValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { status, type } = value;
    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;
    res.json({ status: 1, data: await listApplicationMd({ account: req.account?._id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailApplication = async (req, res) => {
  try {
    const { error, value } = validateData(detailApplicationValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailApplicationMd({ _id });
    if (!data) return res.status(400).json({ status: 0, mess: 'Đơn không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { error, value } = validateData(updateApplicationValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailApplicationMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Đơn không tồn tại!' });
    const data = await updateApplicationMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const cancelApplication = async (req, res) => {
  try {
    const { error, value } = validateData(detailApplicationValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailApplicationMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Đơn không tồn tại!' });
    const data = await updateApplicationMd({ _id }, { updatedBy: req.account._id, status: 4 });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { error, value } = validateData(createApplicationValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const data = await createApplicationMd({ status: 1, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
