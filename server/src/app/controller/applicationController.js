import {
  createApplicationValid,
  detailApplicationValid,
  listApplicationAppValid,
  listApplicationValid,
  updateApplicationValid
} from '@lib/validation';
import {
  countApplicationMd,
  createApplicationMd,
  detailApplicationMd,
  detailShiftMd,
  detailTimekeepingMd,
  listApplicationMd,
  listTimekeepingMd,
  updateApplicationMd
} from '@models';
import { validateData } from '@utils';

export const getListApplication = async (req, res) => {
  try {
    const { error, value } = validateData(listApplicationValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
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
    const { error, value } = validateData(listApplicationAppValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { status, type } = value;
    const where = { account: req.account?._id };
    if (status) where.status = status;
    if (type) where.type = type;
    const data = await listApplicationMd(where);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailApplication = async (req, res) => {
  try {
    const { error, value } = validateData(detailApplicationValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailApplicationMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Đơn không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailApplicationApp = async (req, res) => {
  try {
    const { error, value } = validateData(detailApplicationValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailApplicationMd({ _id, account: req.account?._id });
    if (!data) return res.json({ status: 0, mess: 'Đơn không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { error, value } = validateData(updateApplicationValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailApplicationMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Đơn không tồn tại!' });
    const data = await updateApplicationMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const cancelApplication = async (req, res) => {
  try {
    const { error, value } = validateData(detailApplicationValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailApplicationMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Đơn không tồn tại!' });
    const data = await updateApplicationMd({ _id }, { updatedBy: req.account._id, status: 4 });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { error, value } = validateData(createApplicationValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { shift, type, dates, fromTime, toTime } = value;
    const shiftz = await detailShiftMd({ _id: shift });
    if (!shiftz) return res.json({ status: 0, mess: 'Ca làm việc không tồn tại!' });
    const timekeepings = await listTimekeepingMd({ date: { $in: dates }, account: req.account?._id });
    if (timekeepings.length === 0 && type !== 6) return res.json({ status: 0, mess: 'Không có lịch làm việc trong thời gian đã chọn!' });
    if (type === 6) {
      if (fromTime > toTime) return res.json({ status: 0, mess: 'Thời gian bắt đầu OT không thể lớn hơn thời gian kết thúc!' });
      const checkOt = await detailTimekeepingMd({
        date: dates[0],
        $or: [
          { timeStart: { $gt: fromTime }, timeEnd: { $lt: toTime } },
          { timeStart: { $gt: fromTime }, timeEnd: { $gt: toTime } },
          { timeStart: { $lt: fromTime }, timeEnd: { $gt: toTime } },
          { timeStart: { $lt: fromTime }, timeEnd: { $lt: toTime } }
        ]
      });
      if (checkOt) return res.json({ status: 0, mess: 'Đã có lịch làm việc không thể tạo đơn OT!' });
    }
    const data = await createApplicationMd({ account: req.account?._id, department: req.account?.department?._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
