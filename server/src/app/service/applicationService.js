import { uploadFileToFirebase } from '@lib/firebase';
import {
  createApplicationAdminValid,
  createApplicationValid,
  detailApplicationValid,
  listApplicationAppValid,
  listApplicationValid,
  updateApplicationValid
} from '@lib/validation';
import {
  countApplicationMd,
  createApplicationMd,
  createNotifyMd,
  detailApplicationMd,
  detailShiftMd,
  listAccountMd,
  listApplicationMd,
  listPermissionMd,
  listTimekeepingMd,
  updateApplicationMd,
  createTimekeepingMd,
  detailConfigMd,
  detailTimekeepingMd,
  updateTimekeepingMd,
  deleteSalaryMd
} from '@repository';
import { validateData, calTime, roundNumber } from '@utils';
import { ioSk } from 'src';
import moment from 'moment';

export const approveApplication = async (dataz) => {
  const type = dataz.type;
  if (type === 1) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift });
    if (timekeeping)
      await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
  } else if (type === 2)
    await updateTimekeepingMd(
      { account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift },
      { $addToSet: { applications: dataz._id } }
    );
  else if (type === 3) {
    const dates = dataz.dates;
    for (const date of dates) {
      const timekeeping = await detailTimekeepingMd({ account: dataz.account, date, shift: dataz.shift });
      if (timekeeping)
        await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
    }
  } else if (type === 4) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift });
    if (timekeeping)
      await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
  } else if (type === 5) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift });
    const timeStart = addTimes(timekeeping.timeStart, dataz.late);
    const timeEnd = subtractTimes(timekeeping.timeEnd, dataz.soon);
    if (timekeeping) await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, timeStart, timeEnd });
  } else if (type === 6) {
    const salarySetup = (await detailConfigMd({ type: 2 }))?.salary;
    const ot = salarySetup.ot;
    const holidays = salarySetup.holidays;
    const date = dataz.dates?.[0];
    const isHoliday = holidays.includes(date);
    const isSunday = moment(date).day() === 0;
    const coefficient = isHoliday ? ot.holiday : isSunday ? ot.sunday : ot.day;
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, shift: dataz.shift });
    const totalTime = calTime(`2024-11-01 ${dataz.fromTime}:00`, `2024-11-01 ${dataz.toTime}:00`);
    const totalWork = roundNumber(((timekeeping.totalWork / timekeeping.totalTime) * totalTime * coefficient) / 100);
    await createTimekeepingMd({
      department: dataz.department,
      account: dataz.account,
      shift: dataz.shift,
      date,
      timeStart: dataz.fromTime,
      timeEnd: dataz.toTime,
      totalTime,
      totalWork,
      type: 2,
      applications: [dataz._id]
    });
  } else if (type === 7) {
    const dates = dataz.dates;
    for (const date of dates) {
      const timekeeping = await detailTimekeepingMd({ account: dataz.account, date, shift: dataz.shift });
      if (timekeeping)
        await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
    }
  } else if (type === 8) {
    const dates = dataz.dates;
    for (const date of dates) {
      const timekeeping = await detailTimekeepingMd({ account: dataz.account, date, shift: dataz.shift });
      if (timekeeping) await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id } });
    }
  }
};

export const getListApplicationService = async (req, res) => {
  const { error, value } = validateData(listApplicationValid, req.query);
  if (error) throw new Error(error);
  const { page, limit, status, department, account, type } = value;
  const where = { typez: 1 };
  if (status) where.status = status;
  if (department) where.department = department;
  if (account) where.account = account;
  if (type) where.type = type;
  const documents = await listApplicationMd(where, page, limit);
  const total = await countApplicationMd(where);
  return { documents, total };
};

export const getListAppproveService = async (req, res) => {
  const { error, value } = validateData(listApplicationValid, req.query);
  if (error) throw new Error(error);
  const { page, limit, status, department, account, type } = value;
  const where = { typez: 2 };
  if (status) where.status = status;
  if (department) where.department = department;
  if (account) where.account = account;
  if (type) where.type = type;
  const documents = await listApplicationMd(where, page, limit);
  const total = await countApplicationMd(where);
  return { documents, total };
};

export const getListApplicationAppService = async (req, res) => {
  const { error, value } = validateData(listApplicationAppValid, req.query);
  if (error) throw new Error(error);
  const { status, type } = value;
  const where = { account: req.account?._id };
  if (status) where.status = status;
  if (type) where.type = type;
  const data = await listApplicationMd(where);
  return data;
};

export const detailApplicationService = async (req, res) => {
  const { error, value } = validateData(detailApplicationValid, req.query);
  if (error) throw new Error(error);
  const { _id } = value;
  const data = await detailApplicationMd({ _id });
  if (!data) throw new Error('Đơn không tồn tại!');
  return data;
};

export const detailApplicationAppService = async (req, res) => {
  const { error, value } = validateData(detailApplicationValid, req.query);
  if (error) throw new Error(error);
  const { _id } = value;
  const data = await detailApplicationMd({ _id, account: req.account?._id });
  if (!data) throw new Error('Đơn không tồn tại!');
  return data;
};

export const updateApplicationService = async (req) => {
  const { error, value } = validateData(updateApplicationValid, req.body);
  if (error) throw new Error(error);
  const { _id, status } = value;
  const dataz = await detailApplicationMd({ _id });
  if (!dataz) throw new Error('Đơn không tồn tại!');
  const data = await updateApplicationMd({ _id }, { updatedBy: req.account._id, ...value });
  console.log(dataz, dataz.type);
  
  if (status === 2) {
    if (dataz.type === 9) {
      if (dataz.month && dataz.account) await deleteSalaryMd({ account: dataz.account, month: dataz.month, status: 1 });
    } else await approveApplication(dataz);
  }
  const notify = await createNotifyMd({
    account: dataz.account,
    content: status === 2 ? 'Đơn bạn tạo đã được duyệt!' : 'Đơn bạn tạo không được duyệt!',
    type: 3,
    data: { _id: dataz._id }
  });
  ioSk.emit(`notify_${dataz.account}`, { data: notify });
  return data;
};

export const cancelApplicationService = async (req) => {
  const { error, value } = validateData(detailApplicationValid, req.body);
  if (error) throw new Error(error);
  const { _id } = value;
  const dataz = await detailApplicationMd({ _id });
  if (!dataz) throw new Error('Đơn không tồn tại!');
  const data = await updateApplicationMd({ _id }, { status: 4 });
  return data;
};

export const createApplicationService = async (req) => {
  const { error, value } = validateData(createApplicationValid, req.body);
  if (error) throw new Error(error);
  const { shift, type, dates, fromTime, toTime } = value;
  const shiftz = await detailShiftMd({ _id: shift });
  if (!shiftz) throw new Error('Ca làm việc không tồn tại!');
  const timekeepings = await listTimekeepingMd({ date: { $in: dates }, account: req.account?._id });
  if (timekeepings.length === 0 && type !== 6) throw new Error('Không có lịch làm việc trong thời gian đã chọn!');
  if (type === 6) {
    if (fromTime > toTime) throw new Error('Thời gian bắt đầu OT không thể lớn hơn thời gian kết thúc!');
    const checkOt = await detailTimekeepingMd({
      date: dates[0],
      $or: [
        { timeStart: { $gt: fromTime, $lt: toTime } },
        { timeEnd: { $gt: fromTime, $lt: toTime } },
        { timeStart: { $lt: fromTime }, timeEnd: { $gt: toTime } }
      ]
    });
    if (checkOt) throw new Error('Đã có lịch làm việc không thể tạo đơn OT!');
  }
  value.files = [];
  if (req.files?.['files']?.length > 0) {
    for (const file of req.files['files']) {
      value.files.push(await uploadFileToFirebase(file));
    }
  }
  value.typez = type === 8 ? 2 : 1;
  const where = type === 8 ? { 'tools.route': 'approve' } : { 'tools.route': 'application' };
  const data = await createApplicationMd({ account: req.account?._id, department: req.account?.department?._id, ...value });
  const permissions = await listPermissionMd(where);
  const accounts = await listAccountMd({ role: 'admin' });
  for (const permission of permissions) {
    const accountz = await listAccountMd({ department: { $in: permission.departments }, position: { $in: permission.positions } });
    accountz.forEach((az) => !accounts.find((a) => a._id === az._id) && accounts.push(az));
  }
  for (const account of accounts) {
    const notify = await createNotifyMd({
      account: account._id,
      content: `${req.account.fullName} - ${req.account.staffCode} đã thêm một đơn mới cần duyệt!`,
      type: 2,
      data: { _id: data._id }
    });
    ioSk.emit(`notify_${account._id}`, notify);
  }
  return data;
};

export const createApplicationAdminService = async (req) => {
  const { error, value } = validateData(createApplicationAdminValid, req.body);
  if (error) throw new Error(error);
  const { account, shift, type, dates, fromTime, toTime } = value;
  const shiftz = await detailShiftMd({ _id: shift });
  if (!shiftz) throw new Error('Ca làm việc không tồn tại!');
  const timekeepings = await listTimekeepingMd({ date: { $in: dates }, account });
  if (timekeepings.length === 0 && type !== 6) throw new Error('Không có lịch làm việc trong thời gian đã chọn!');
  if (type === 6) {
    if (fromTime > toTime) throw new Error('Thời gian bắt đầu OT không thể lớn hơn thời gian kết thúc!');
    const checkOt = await detailTimekeepingMd({
      date: dates[0],
      $or: [
        { timeStart: { $gt: fromTime, $lt: toTime } },
        { timeEnd: { $gt: fromTime, $lt: toTime } },
        { timeStart: { $lt: fromTime }, timeEnd: { $gt: toTime } }
      ]
    });
    if (checkOt) throw new Error('Đã có lịch làm việc không thể tạo đơn OT!');
  }
  value.files = [];
  if (req.files?.['files']?.length > 0) {
    for (const file of req.files['files']) {
      value.files.push(await uploadFileToFirebase(file));
    }
  }
  value.typez = type === 8 ? 2 : 1;
  const data = await createApplicationMd({ ...value, status: 2, updatedBy: req.account?._id });
  await approveApplication(data);
  return data;
};
