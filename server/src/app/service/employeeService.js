import { employeeTypes } from '@constant';
import { uploadFileToFirebase } from '@lib/firebase';
import { changePasswordValid, createEmployeeValid, detailEmployeeValid, listEmployeeValid, updateEmployeeValid } from '@lib/validation';
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
  deleteTimekeepingMd,
  detailAccountMd,
  detailContactMd,
  detailDepartmentMd,
  detailEducationMd,
  detailInsuranceMd,
  detailJobPositionMd,
  detailPositionMd,
  listAccountMd,
  listShiftMd,
  listWorkHistoryMd,
  updateAccountMd,
  updateContactMd,
  updateEducationMd,
  updateInsuranceMd
} from '@repository';
import { formatNumber, generateRandomString, validateData } from '@utils';
import moment from 'moment';
import bcrypt from 'bcrypt';
import { deleteFace, registerFace } from '@lib/face-id';
import { createTimekeepingByAccount } from '@service';

export const getListWorkHistory = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.query);
    const { _id } = value;
    if (error) return res.json({ status: 0, mess: error });
    res.json({ status: 1, data: await listWorkHistoryMd({ account: _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListAccountInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listAccountMd({}) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListEmployeeApp = async (req, res) => {
  try {
    const data = req.account?.department
      ? await listAccountMd({ status: 1, department: req.account?.department?._id }, false, false, [
          { path: 'department', select: 'name' },
          { path: 'position', select: 'name' },
          { path: 'jobPosition', select: 'name' }
        ])
      : [req.account];
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(listEmployeeValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
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

export const deleteEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
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

export const detailEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = {
      ...(await detailContactMd({ account: _id })),
      ...(await detailInsuranceMd({ account: _id })),
      ...(await detailEducationMd({ account: _id })),
      ...(await detailAccountMd({ _id }))
    };
    if (!data?._id || String(data._id) !== _id) return res.json({ status: 0, mess: 'Nhân viên không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(updateEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, staffCode, email, phone, cmt, type, department, salary, position, jobPosition } = value;
    value._id = undefined;
    const dataz = await detailAccountMd({ _id }, [
      { path: 'department', select: 'name' },
      { path: 'position', select: 'name' },
      { path: 'jobPosition', select: 'name' }
    ]);
    if (!dataz) return res.json({ status: 0, mess: 'Không tìm thấy nhân viên!' });
    const checkDepartment = department ? await detailDepartmentMd({ _id: department }) : null;
    if (department && !checkDepartment) return res.json({ status: 0, mess: 'Không tìm thấy phòng ban!' });
    const checkPosition = position ? await detailPositionMd({ _id: position }) : null;
    if (position && !checkPosition) return res.json({ status: 0, mess: 'Không tìm thấy chức vụ!' });
    const checkJobPosition = jobPosition ? await detailJobPositionMd({ _id: jobPosition }) : null;
    if (jobPosition && !checkJobPosition) return res.json({ status: 0, mess: 'Không tìm thấy vị trí công việc!' });
    if (staffCode) {
      const checkCode = await detailAccountMd({ staffCode });
      if (checkCode) return res.json({ status: 0, mess: 'Mã nhân viên đã tồn tại!' });
    }
    if (email) {
      const checkEmail = await detailAccountMd({ email });
      if (checkEmail) return res.json({ status: 0, mess: 'Email đã tồn tại!' });
    }
    if (phone) {
      const checkPhone = await detailAccountMd({ phone });
      if (checkPhone) return res.json({ status: 0, mess: 'Số điện thoại đã tồn tại!' });
    }
    if (cmt) {
      const checkCmt = await detailAccountMd({ cmt });
      if (checkCmt) return res.json({ status: 0, mess: 'Số CMT/CCCD đã tồn tại!' });
    }
    if (req.files?.['avatar']?.length > 0) {
      await deleteFace(_id);
      const { status, mess } = await registerFace(_id, value.fullName || dataz.fullName, req.files['avatar'][0]);
      if (!status && mess) return res.json({ status: 0, mess });
      for (const file of req.files['avatar']) {
        value.avatar = await uploadFileToFirebase(file);
      }
    }
    if (value.cmtFiles) value.cmtFiles = Array.isArray(value.cmtFiles) ? value.cmtFiles : [];
    if (req.files?.['cmtFiles']?.length > 0) {
      value.cmtFiles = Array.isArray(value.cmtFiles) ? value.cmtFiles : [];
      for (const file of req.files['cmtFiles']) {
        value.cmtFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (value.taxFiles) value.taxFiles = Array.isArray(value.taxFiles) ? value.taxFiles : [];
    if (req.files?.['taxFiles']?.length > 0) {
      value.taxFiles = Array.isArray(value.taxFiles) ? value.taxFiles : [];
      for (const file of req.files['taxFiles']) {
        value.taxFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (value.educationFiles) value.educationFiles = Array.isArray(value.educationFiles) ? value.educationFiles : [];
    if (req.files?.['educationFiles']?.length > 0) {
      value.educationFiles = Array.isArray(value.educationFiles) ? value.educationFiles : [];
      for (const file of req.files['educationFiles']) {
        value.educationFiles.push(await uploadFileToFirebase(file));
      }
    }
    if (value.healthFiles) value.healthFiles = Array.isArray(value.healthFiles) ? value.healthFiles : [];
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
          `Thay đổi loại nhân viên từ ${employeeTypes.find((p) => p._id === dataz.type)?.name} thành ${employeeTypes.find((p) => p._id === type)?.name}`
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

    if (department) {
      await deleteTimekeepingMd({ department: dataz?.department?._id, date: { $gt: new Date() } });
      const shifts = await listShiftMd({ departments: { $elemMatch: { $eq: department } } });
      if (shifts?.length > 0) {
        for (const shift of shifts) {
          await createTimekeepingByAccount({ ...shift, dateStart: moment().add(1, 'days').format('YYYY-MM-DD') }, data);
        }
      }
    }

    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(createEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { staffCode, email, phone, cmt, department } = value;
    const checkCode = await detailAccountMd({ staffCode });
    if (checkCode) return res.json({ status: 0, mess: 'Mã nhân viên đã tồn tại!' });
    const checkEmail = await detailAccountMd({ email });
    if (checkEmail) return res.json({ status: 0, mess: 'Email đã tồn tại!' });
    const checkPhone = await detailAccountMd({ phone });
    if (checkPhone) return res.json({ status: 0, mess: 'Số điện thoại đã tồn tại!' });
    const checkCmt = await detailAccountMd({ cmt });
    if (checkCmt) return res.json({ status: 0, mess: 'Số CMT/CCCD đã tồn tại!' });

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

    if (req.files?.['avatar']?.length > 0) {
      const { status, mess } = await registerFace(data._id, value.fullName, req.files['avatar'][0]);
      if (!status && mess) return res.json({ status: 0, mess });
    }
    if (department) {
      const shifts = await listShiftMd({ departments: { $elemMatch: { $eq: department } } });
      if (shifts?.length > 0) {
        for (const shift of shifts) {
          await createTimekeepingByAccount(data, shift);
        }
      }
    }
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
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

export const changePassword = async (req, res) => {
  try {
    const { error, value } = validateData(changePasswordValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { password, newPassword } = value;
    const checkpassword = await bcrypt.compare(password, req.account?.password);
    if (!checkpassword) return res.json({ status: 0, mess: 'Mật khẩu không chính xác!' });
    const salt = await bcrypt.genSalt(10);
    const passwordz = await bcrypt.hash(newPassword, salt);
    await updateAccountMd({ _id: req.account?._id }, { password: passwordz, token: '' });
    res.status(201).json({ status: 1, data: newPassword });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
