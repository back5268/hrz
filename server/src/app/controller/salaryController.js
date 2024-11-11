import { sendMailSalary } from '@lib/node-mailer';
import { detailSalaryValid, listSalaryValid, sendSalaryValid, updateStatusSalaryValid } from '@lib/validation';
import { countSalaryMd, deleteSalaryMd, detailSalaryMd, detailTemplateMd, listSalaryMd, updateSalaryMd } from '@models';
import { previewSalaryRp } from '@repository/salaryRp';
import { validateData } from '@utils';

export const getListSalaryApproved = async (req, res) => {
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

export const updateStatusSalary = async (req, res) => {
  try {
    const { error, value } = validateData(updateStatusSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _ids, status } = value;
    if (Array.isArray(_ids)) {
      await updateSalaryMd({ _id: { $in: _ids } }, { status });
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
    if (data.status === 2) return res.json({ status: 0, mess: 'Phiếu lương đã được duyệt không thể xóa!' });
    res.status(201).json({ status: 1, data: await deleteSalaryMd({ _id }) });
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
    const { data, mess } = await previewSalaryRp(value._id);
    if (mess) res.json({ status: 0, mess });
    else res.json({ status: 1, data: data.html });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const sendSalary = async (req, res) => {
  try {
    const { error, value } = validateData(sendSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _ids } = value;
    if (Array.isArray(_ids)) {
      for (const _id of _ids) {
        const { data, mess } = await previewSalaryRp(_id);
        if (mess) continue;
        const { html, subject, account } = data;
        await sendMailSalary({ html, subject, to: account.email });
      }
    }
    res.json({ status: 1, data: {} });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
