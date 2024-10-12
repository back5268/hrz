import { personnelTypes } from '@constant';
import { uploadFileToFirebase } from '@lib/firebase';
import { createPersonnelValid, detailPersonnelValid, listPersonnelValid, updatePersonnelValid } from '@lib/validation';
import {
  countAccountMd,
  createAccountMd,
  createContactMd,
  createEducationMd,
  createInsuranceMd,
  createWorkHistoryMd,
  deleteAccountMd,
  deleteContactMd,
  deleteEducationMd,
  deleteInsuranceMd,
  detailAccountMd,
  detailContactMd,
  detailDepartmentMd,
  detailEducationMd,
  detailInsuranceMd,
  detailJobPositionMd,
  detailPositionMd,
  listAccountMd,
  listJobPositionMd,
  listPositionMd,
  listWorkHistoryMd,
  updateAccountMd,
  updateContactMd,
  updateEducationMd,
  updateInsuranceMd
} from '@models';
import { formatNumber, generateRandomString, validateData } from '@utils';
import moment from 'moment';
import bcrypt from 'bcrypt';

export const getListWorkHistory = async (req, res) => {
  const { error, value } = validateData(detailPersonnelValid, req.query);
  const { _id } = value;
  if (error) return res.status(400).json({ status: 0, mess: error });
  res.json({ status: 1, data: await listWorkHistoryMd({ account: _id }) });
};

export const getListAccountInfo = async (req, res) => {
  res.json({ status: 1, data: await listAccountMd({}) });
};

export const getListPersonnel = async (req, res) => {
  try {
    const { error, value } = validateData(listPersonnelValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { page, limit, keySearch, email, department, position, jobPosition, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ fullName: { $regex: keySearch, $options: 'i' } }, { staffCode: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { phone: { $regex: email, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (department) where.department = department;
    if (position) where.position = position;
    if (jobPosition) where.jobPosition = jobPosition;
    const documents = await listAccountMd(where, page, limit, [
      { path: 'jobPosition', select: 'name' },
      { path: 'position', select: 'name' },
      { path: 'department', select: 'name' }
    ]);
    const total = await countAccountMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deletePersonnel = async (req, res) => {
  try {
    const { error, value } = validateData(detailPersonnelValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deleteAccountMd({ _id });
    await deleteContactMd({ account: _id });
    await deleteInsuranceMd({ account: _id });
    await deleteEducationMd({ account: _id });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailPersonnel = async (req, res) => {
  try {
    const { error, value } = validateData(detailPersonnelValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const data = {
      ...(await detailContactMd({ account: _id }))?._doc,
      ...(await detailInsuranceMd({ account: _id }))?._doc,
      ...(await detailEducationMd({ account: _id }))?._doc,
      ...(await detailAccountMd({ _id }))?._doc
    };
    if (!data?._id || String(data._id) !== _id) return res.status(400).json({ status: 0, mess: 'Nhân viên không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updatePersonnel = async (req, res) => {
  try {
    const { error, value } = validateData(updatePersonnelValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id, staffCode, email, phone, cmt, type, department, salary, position, jobPosition } = value;
    value._id = undefined;
    const dataz = await detailAccountMd({ _id }, [
      { path: 'department', select: 'name' },
      { path: 'position', select: 'name' },
      { path: 'jobPosition', select: 'name' }
    ]);
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Không tìm thấy nhân viên!' });
    const checkDepartment = department ? await detailDepartmentMd({ _id: department }) : null;
    if (department && !checkDepartment) return res.status(400).json({ status: 0, mess: 'Không tìm thấy phòng ban!' });
    const checkPosition = position ? await detailPositionMd({ _id: position }) : null;
    if (position && !checkPosition) return res.status(400).json({ status: 0, mess: 'Không tìm thấy chức vụ!' });
    const checkJobPosition = jobPosition ? await detailJobPositionMd({ _id: jobPosition }) : null;
    if (jobPosition && !checkJobPosition) return res.status(400).json({ status: 0, mess: 'Không tìm thấy vị trí công việc!' });
    if (staffCode) {
      const checkCode = await detailAccountMd({ staffCode });
      if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã nhân viên đã tồn tại!' });
    }
    if (email) {
      const checkEmail = await detailAccountMd({ email });
      if (checkEmail) return res.status(400).json({ status: 0, mess: 'Email đã tồn tại!' });
    }
    if (phone) {
      const checkPhone = await detailAccountMd({ phone });
      if (checkPhone) return res.status(400).json({ status: 0, mess: 'Số điện thoại đã tồn tại!' });
    }
    if (cmt) {
      const checkCmt = await detailAccountMd({ cmt });
      if (checkCmt) return res.status(400).json({ status: 0, mess: 'Số CMT/CCCD đã tồn tại!' });
    }
    if (req.files?.['avatar']?.length > 0) {
      for (const file of req.files['avatar']) {
        value.avatar = await uploadFileToFirebase(file);
      }
    }
    if (req.files?.['cmtFiles']?.length > 0) {
      value.cmtFiles = Array.isArray(value.cmtFiles) ? value.cmtFiles : [];
      for (const file of req.files['cmtFiles']) {
        value.cmtFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['taxFiles']?.length > 0) {
      value.taxFiles = Array.isArray(value.taxFiles) ? value.taxFiles : [];
      for (const file of req.files['taxFiles']) {
        value.taxFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['educationFiles']?.length > 0) {
      value.educationFiles = Array.isArray(value.educationFiles) ? value.educationFiles : [];
      for (const file of req.files['educationFiles']) {
        value.educationFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['healthFiles']?.length > 0) {
      value.healthFiles = Array.isArray(value.healthFiles) ? value.healthFiles : [];
      for (const file of req.files['healthFiles']) {
        value.healthFiles.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateAccountMd({ _id }, value);
    await updateContactMd({ account: _id }, value);
    await updateInsuranceMd({ account: _id }, value);
    await updateEducationMd({ account: _id }, value);

    if (type || department || position || jobPosition || salary) {
      const note = [];
      if (type)
        note.push(
          `Thay đổi loại nhân sự từ ${personnelTypes.find((p) => p._id === dataz.type)?.name} thành ${personnelTypes.find((p) => p._id === type)?.name}`
        );
      if (department) {
        if (dataz.department?.name) note.push(`Điều chuyển phòng ban từ ${dataz.department?.name} sang ${checkDepartment?.name}`);
        else note.push(`Điều chuyển vào phòng ban ${checkDepartment?.name}`);
      }
      if (position) note.push(`Thay đổi chức vụ từ ${dataz.position?.name} thành ${checkPosition?.name}`);
      if (jobPosition) note.push(`Thay đổi vị trí công việc từ ${dataz.jobPosition?.name} thành ${checkJobPosition?.name}`);
      if (salary) {
        if (salary > dataz.salary) note.push(`Tăng lương cơ bản từ ${formatNumber(dataz.salary)} VNĐ lên ${formatNumber(salary)} VNĐ`);
        else note.push(`Giảm lương cơ bản từ ${formatNumber(dataz.salary)} VNĐ xuống ${formatNumber(salary)} VNĐ`);
      }
      await createWorkHistoryMd({
        by: req.account?._id,
        account: _id,
        before: dataz,
        after: data,
        note
      });
    }

    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createPersonnel = async (req, res) => {
  try {
    const { error, value } = validateData(createPersonnelValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { staffCode, email, phone, cmt } = value;
    const checkCode = await detailAccountMd({ staffCode });
    if (checkCode) return res.status(400).json({ status: 0, mess: 'Mã nhân viên đã tồn tại!' });
    const checkEmail = await detailAccountMd({ email });
    if (checkEmail) return res.status(400).json({ status: 0, mess: 'Email đã tồn tại!' });
    const checkPhone = await detailAccountMd({ phone });
    if (checkPhone) return res.status(400).json({ status: 0, mess: 'Số điện thoại đã tồn tại!' });
    const checkCmt = await detailAccountMd({ cmt });
    if (checkCmt) return res.status(400).json({ status: 0, mess: 'Số CMT/CCCD đã tồn tại!' });

    (value.avatar = null), (value.cmtFiles = []), (value.taxFiles = []), (value.educationFiles = []), (value.healthFiles = []);
    if (req.files?.['avatar']?.length > 0) {
      for (const file of req.files['avatar']) {
        value.avatar = await uploadFileToFirebase(file);
      }
    }
    if (req.files?.['cmtFiles']?.length > 0) {
      for (const file of req.files['cmtFiles']) {
        value.cmtFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['taxFiles']?.length > 0) {
      for (const file of req.files['taxFiles']) {
        value.taxFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['educationFiles']?.length > 0) {
      for (const file of req.files['educationFiles']) {
        value.educationFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['healthFiles']?.length > 0) {
      for (const file of req.files['healthFiles']) {
        value.healthFiles.push(await uploadFileToFirebase(file));
      }
    }

    const data = await createAccountMd(value);
    value.account = data._id;
    await createContactMd(value);
    await createInsuranceMd(value);
    await createEducationMd(value);
    await createWorkHistoryMd({
      by: req.account?._id,
      account: data._id,
      before: {},
      after: data,
      note: [`Thêm mới nhân viên, ngày vào ${moment(value.dateIn).format('DD/MM/YYYY')}`]
    });

    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { error, value } = validateData(detailPersonnelValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const newPassword = generateRandomString(8);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);
    await updateAccountMd({ _id }, { password, token: '' });
    res.status(201).json({ status: 1, data: newPassword });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
