import { createContractValid, detailContractValid, listContractValid, updateContractValid } from '@lib/validation';
import { getListBankVietQr } from '@lib/viet-qr';
import {
  createContractMd,
  deleteContractMd,
  detailAccountMd,
  detailContractMd,
  detailJobPositionMd,
  detailTemplateMd,
  listContractMd,
  updateContractMd
} from '@models';
import { ghepGiaTri, validateData } from '@utils';
import moment from 'moment';

export const getListContract = async (req, res) => {
  try {
    const { error, value } = validateData(listContractValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { account, type, status } = value;
    const where = { account };
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    res.json({ status: 1, data: await listContractMd(where) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListContractApp = async (req, res) => {
  try {
    res.json({ status: 1, data: await listContractMd({ account: req.account?._id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteContract = async (req, res) => {
  try {
    const { error, value } = validateData(detailContractValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, account } = value;
    const data = await deleteContractMd({ _id, account });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { error, value } = validateData(updateContractValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, code, account } = value;
    if (code) {
      const checkCode = await detailContractMd({ code });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Số hợp đồng đã tồn tại!' });
    }
    const data = await updateContractMd({ _id, account }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const cancelContract = async (req, res) => {
  try {
    const { error, value } = validateData(detailContractValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, account } = value;
    const data = await updateContractMd({ _id, account }, { updatedBy: req.account._id, status: 4 });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createContract = async (req, res) => {
  try {
    const { error, value } = validateData(createContractValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { code, signedDate, expiredDate } = value;
    if (new Date(signedDate) > new Date(expiredDate))
      return res.status(400).json({ status: 0, mess: 'Ngày ký không thể lớn hơn ngày hết hạn!' });
    if (new Date() > new Date(expiredDate)) value.status = 2;
    else if (new Date() > new Date(signedDate) && new Date() < new Date(expiredDate)) value.status = 1;
    else if (new Date() < new Date(signedDate)) value.status = 3;
    const checkCode = await detailContractMd({ code });
    if (checkCode) return res.status(400).json({ status: 0, mess: 'Số hợp đồng đã tồn tại!' });
    const data = await createContractMd({ by: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const renderContract = async (req, res) => {
  try {
    const { error, value } = validateData(detailContractValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { account: accountz, _id } = value;
    const contract = await detailContractMd({ _id, account: accountz });
    if (!contract) res.status(400).json({ status: 0, mess: 'Không tìm thấy hợp đồng!' });
    if (contract.template) return res.json({ status: 1, data: contract.template });
    else {
      const template = await detailTemplateMd({ type: contract.type });
      if (!template || !template.content) return res.status(400).json({ status: 0, mess: 'Không có mẫu hợp đồng!' });
      const account = await detailAccountMd({ _id: accountz }, [{ path: 'jobPosition', select: 'name' }]);
      if (!account) return res.status(400).json({ status: 0, mess: 'Không tìm thấy nhân viên!' });
      const gender = account.gender;
      const banks = await getListBankVietQr();
      const content = template.content;
      const params = {
        $so_hieu: contract.code,
        $ho_va_ten: account.fullName?.toUpperCase(),
        $gioi_tinh: gender === 1 ? 'Nam' : gender === 2 ? 'Nữ' : 'Khác',
        $ngay_sinh: moment(account.birthday).format('DD/MM/YYYY'),
        $quoc_tich: account.nationality,
        $cmt: account.cmt,
        $ngay_cap: moment(account.dateOfIssue).format('DD/MM/YYYY'),
        $noi_cap: account.placeOfIssue,
        $dia_chi_thuong_tru: account.address,
        $so_tai_khoan: account.bankAccount,
        $ngan_hang: banks?.find((b) => b._id === account.bank)?.name,
        $vi_tri_cong_viec: account.jobPosition?.name || '',
        $ngay_ky: moment(contract.signedDate).format('DD/MM/YYYY')
      };
      res.json({ status: 1, data: ghepGiaTri({ params, content }) });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
