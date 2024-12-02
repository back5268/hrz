import { convertHTMLToPDF } from '@lib/puppeteer';
import { detailSalaryValid, handleSalaryValid, listSalaryValid, updateStatusSalaryValid } from '@lib/validation';
import {
  countSalaryMd,
  createApplicationMd,
  createNotifyMd,
  deleteSalaryMd,
  detailSalaryMd,
  listAccountMd,
  listPermissionMd,
  listSalaryMd,
  updateSalaryMd
} from '@repository';
import { previewSalaryService, sendMailSalary } from '@service';
import { validateData } from '@utils';
import { ioSk } from 'src';

export const getListSalary = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account, status } = value;
    const where = {};
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    if (status) where.status = status;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryPending = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account } = value;
    const where = { status: 1 };
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryPendingz = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account } = value;
    const where = { status: 2 };
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryApproved = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account } = value;
    const where = { status: 3 };
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryApp = async (req, res) => {
  try {
    const where = { account: req.account?._id };
    res.json({ status: 1, data: await listSalaryMd(where) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateStatusSalary = async (req, res) => {
  try {
    const { error, value } = validateData(updateStatusSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _ids, status } = value;
    if (Array.isArray(_ids)) {
      await updateSalaryMd({ _id: { $in: _ids } }, { status });
      if (status === 4) {
        for (const _id of _ids) {
          const { data, mess } = await previewSalaryService(_id);
          if (mess) continue;
          const { html, subject, account } = data;
          await sendMailSalary({ html, subject, to: account.email });
        }
      }
    }
    res.json({ status: 1, data: {} });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailSalaryMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    if (data.status !== 1) return res.json({ status: 0, mess: 'Phiếu lương đã được duyệt không thể xóa!' });
    res.status(201).json({ status: 1, data: await deleteSalaryMd({ _id, status: 1 }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailSalaryMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const previewSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { data, mess } = await previewSalaryService(value._id);
    if (mess) res.json({ status: 0, mess });
    else res.json({ status: 1, data: data.html });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const previewSalaryApp = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { data, mess } = await previewSalaryService(value._id);
    if (mess) res.json({ status: 0, mess });
    else res.json({ status: 1, data: { content: data.html, status: data.data?.status } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const downloadSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailSalaryMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    if (dataz.file) return res.json({ status: 1, data: dataz.file });
    else {
      const { data, mess } = await previewSalaryService(_id, dataz);
      if (mess) res.json({ status: 0, mess });
      const file = await convertHTMLToPDF(data.html);
      await updateSalaryMd({ _id }, { file });
      return res.json({ status: 1, data: file });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const handleSalary = async (req, res) => {
  try {
    const { error, value } = validateData(handleSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, status, reason } = value;
    const dataz = await detailSalaryMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    if (status === 1) {
      await updateSalaryMd({ _id }, { status: 2 });
      res.json({ status: 1, data: {} });
    } else {
      const data = await createApplicationMd({ department: req.account?.department?._id, account: req.account?._id, type: 9, reason, month: dataz.month });
      const where = { 'tools.route': 'application' };
      const permissions = await listPermissionMd(where);
      const accounts = await listAccountMd({ role: 'admin' });
      for (const permission of permissions) {
        const accountz = await listAccountMd({ department: { $in: permission.departments }, position: { $in: permission.positions } });
        accountz.forEach((az) => !accounts.find((a) => a._id === az._id) && accounts.push(az));
      }
      for (const account of accounts) {
        const notify = await createNotifyMd({
          account: account._id,
          content: `${req.account.fullName} - ${req.account.staffCode} yêu cầu tính lại phiếu lương tháng ${dataz.month}!`,
          type: 2,
          data: { _id: data._id }
        });
        ioSk.emit(`notify_${account._id}`, notify);
      }
      res.json({ status: 1, data: {} });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
