import { convertHTMLToPDF } from '@lib/puppeteer';
import { createContractValid, detailContractValid, listContractValid, updateContractValid } from '@lib/validation';
import {
  createContractMd,
  deleteContractMd,
  detailContractMd,
  listContractMd,
  updateContractMd
} from '@repository';
import { previewContractService } from '@service';
import { validateData } from '@utils';

export const getListContract = async (req, res) => {
  try {
    const { error, value } = validateData(listContractValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
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
    if (error) return res.json({ status: 0, mess: error });
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
    if (error) return res.json({ status: 0, mess: error });
    let { _id, code, account, signedDate, expiredDate } = value;
    const contract = await detailContractMd({ _id, account });
    if (!contract) return res.json({ status: 0, mess: 'Không tìm thấy hợp đồng!' });
    if (code) {
      const checkCode = await detailContractMd({ code, account });
      if (checkCode) return res.json({ status: 0, mess: 'Số hợp đồng đã tồn tại!' });
    }
    if (signedDate || expiredDate) {
      signedDate = signedDate || contract.signedDate;
      expiredDate = expiredDate || contract.expiredDate;
      const checkContract = await detailContractMd({
        $or: [
          {
            signedDate: {
              $gte: signedDate,
              $lte: expiredDate
            }
          },
          {
            expiredDate: {
              $gte: signedDate,
              $lte: expiredDate
            }
          }
        ],
        status: { $ne: 4 },
        _id: { $ne: _id },
        account
      });
      if (checkContract)
        return res.json({ status: 0, mess: 'Khoảng thời gian này đã có hợp đồng, vui lòng xác nhận hủy trước khi cập nhật!' });
      if (new Date(signedDate) > new Date(expiredDate)) return res.json({ status: 0, mess: 'Ngày ký không thể lớn hơn ngày hết hạn!' });
      if (new Date() > new Date(expiredDate)) value.status = 2;
      else if (new Date() > new Date(signedDate) && new Date() < new Date(expiredDate)) value.status = 1;
      else if (new Date() < new Date(signedDate)) value.status = 3;
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
    if (error) return res.json({ status: 0, mess: error });
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
    if (error) return res.json({ status: 0, mess: error });
    const { code, signedDate, expiredDate } = value;
    const checkContract = await detailContractMd({
      $or: [
        {
          signedDate: {
            $gte: signedDate,
            $lte: expiredDate
          }
        },
        {
          expiredDate: {
            $gte: signedDate,
            $lte: expiredDate
          }
        }
      ],
      status: { $ne: 4 },
      account: value.account
    });
    if (checkContract) return res.json({ status: 0, mess: 'Khoảng thời gian này đã có hợp đồng, vui lòng xác nhận hủy trước khi thêm!' });

    if (new Date(signedDate) > new Date(expiredDate)) return res.json({ status: 0, mess: 'Ngày ký không thể lớn hơn ngày hết hạn!' });
    if (new Date() > new Date(expiredDate)) value.status = 2;
    else if (new Date() > new Date(signedDate) && new Date() < new Date(expiredDate)) value.status = 1;
    else if (new Date() < new Date(signedDate)) value.status = 3;
    const checkCode = await detailContractMd({ code });
    if (checkCode) return res.json({ status: 0, mess: 'Số hợp đồng đã tồn tại!' });
    const data = await createContractMd({ by: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const previewContract = async (req, res) => {
  try {
    const { error, value } = validateData(detailContractValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { account: accountz, _id } = value;
    const contract = await detailContractMd({ _id, account: accountz });
    if (!contract) res.json({ status: 0, mess: 'Không tìm thấy hợp đồng!' });
    if (contract.template) return res.json({ status: 1, data: contract.template });
    else {
      const { data, mess } = await previewContractService(_id, accountz, contract);
      if (mess) res.json({ status: 0, mess });
      else res.json({ status: 1, data: data.html });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const downloadContract = async (req, res) => {
  try {
    const { error, value } = validateData(detailContractValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { account: accountz, _id } = value;
    const contract = await detailContractMd({ _id, account: accountz });
    if (!contract) res.json({ status: 0, mess: 'Không tìm thấy hợp đồng!' });
    if (!contract.template) {
      const { data, mess } = await previewContractService(_id, accountz, contract);
      if (mess) res.json({ status: 0, mess });
      contract.template = data.html;
    }
    const file = await convertHTMLToPDF(contract.template);
    await updateContractMd({ _id }, { template: contract.template });
    return res.json({ status: 1, data: file });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
