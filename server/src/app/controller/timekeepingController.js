import { days } from '@constant';
import { convertToExcel, excelDateToJSDate, handleFileExcel } from '@lib/excel-js';
import { checkFace } from '@lib/face-id';
import {
  listTimekeepingLogValid,
  listTimekeepingValid,
  listSyntheticTimekeepingValid,
  exportTimekeepingValid,
  checkTimekeepingAppValid,
  listTimekeepingLogAppValid,
  listTimekeepingAppValid
} from '@lib/validation';
import {
  countTimekeepingMd,
  countTimekeepingLogMd,
  createTimekeepingLogMd,
  detailAccountMd,
  detailDeviceMd,
  detailTimekeepingMd,
  detailShiftMd,
  listTimekeepingMd,
  listTimekeepingLogMd,
  updateTimekeepingMd,
  createImportLogMd
} from '@models';
import { calTimekeeping, syntheticTimekeeping } from '@repository';
import { checkValidTime, formatDate, convertNumberToTime, databaseDate, getDates, validateData } from '@utils';
import moment from 'moment';

const handleParams = (value) => {
  const { shift, department, account, fromDate, toDate } = value;
  const where = {};
  if (shift) where.shift = shift;
  if (department) where.department = department;
  if (account) where.account = account;
  where.date = {
    $gte: fromDate,
    $lte: toDate
  };
  return where;
};

export const getListTimekeepingLog = async (req, res) => {
  try {
    const { error, value } = validateData(listTimekeepingLogValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit } = value;
    const where = handleParams(value);
    const documents = await listTimekeepingLogMd(where, page, limit);
    const total = await countTimekeepingLogMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const exportTimekeepingLog = async (req, res) => {
  try {
    const { error, value } = validateData(exportTimekeepingValid, req.query);
    if (error) return res.json({ status: false, mess: error });
    const where = handleParams(value);
    const data = await listTimekeepingLogMd(where, false, false, [
      { path: 'account', select: 'fullName staffCode' },
      { path: 'department', select: 'name' },
      { path: 'shift', select: 'name' }
    ]);
    const dataz = [];
    dataz.push(['STT', 'Phòng ban', 'Nhân viên', 'Mã NV', 'Ca làm việc', 'Ngày', 'Ngày trong tuần', 'Thời gian', 'Thiết bị chấm công']);
    if (data?.length > 0) {
      let index = 1;
      for (const datum of data) {
        dataz.push([
          index,
          datum.department?.name,
          datum.account?.fullName,
          datum.account?.staffCode,
          datum.shift?.name,
          formatDate(datum.date, 'date'),
          days[new Date(datum.date).getDay()]?.name,
          datum.time,
          datum.deviceName || ''
        ]);
        index += 1;
      }
    }
    res
      .status(200)
      .attachment('file.xlsx')
      .send(await convertToExcel(dataz));
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListTimekeeping = async (req, res) => {
  try {
    const { error, value } = validateData(listTimekeepingValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit } = value;
    const where = handleParams(value);
    const documents = await listTimekeepingMd(where, page, limit);
    const total = await countTimekeepingMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const exportTimekeeping = async (req, res) => {
  try {
    const { error, value } = validateData(exportTimekeepingValid, req.query);
    if (error) return res.json({ status: false, mess: error });
    const where = handleParams(value);
    const data = await listTimekeepingMd(where, false, false, [
      { path: 'account', select: 'fullName staffCode' },
      { path: 'department', select: 'name' },
      { path: 'shift', select: 'name' }
    ]);
    const dataz = [];
    dataz.push([
      'STT',
      'Phòng ban',
      'Nhân viên',
      'Mã NV',
      'Ca làm việc',
      'Ngày',
      'Ngày trong tuần',
      'Thời gian vào',
      'Thời gian ra',
      'Đi muộn',
      'Về sớm',
      'Tổng thời gian',
      'Công thực tế',
      'Đơn từ'
    ]);
    if (data?.length > 0) {
      let index = 1;
      for (const datum of data) {
        dataz.push([
          index,
          datum.department?.name,
          datum.account?.fullName,
          datum.account?.staffCode,
          datum.shift?.name,
          formatDate(datum.date, 'date'),
          days[new Date(datum.date).getDay()]?.name,
          datum.checkInTime || '-',
          datum.checkOutTime || '-',
          convertNumberToTime(datum.late),
          convertNumberToTime(datum.soon),
          convertNumberToTime(datum.totalTimeReality),
          datum.summary || 0,
          ''
        ]);
        index += 1;
      }
    }
    res
      .status(200)
      .attachment('file.xlsx')
      .send(await convertToExcel(dataz));
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSyntheticTimekeeping = async (req, res) => {
  try {
    const { error, value } = validateData(listSyntheticTimekeepingValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const where = handleParams(value);
    const data = await listTimekeepingMd(where);
    res.json({ status: 1, data: syntheticTimekeeping(data) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const exportSyntheticTimekeeping = async (req, res) => {
  try {
    const { error, value } = validateData(exportTimekeepingValid, req.query);
    if (error) return res.json({ status: false, mess: error });
    const { fromDate, toDate } = value;
    const where = handleParams(value);
    const data = await listTimekeepingMd(where, false, false, [
      { path: 'account', select: 'fullName staffCode' },
      { path: 'department', select: 'name' },
      { path: 'shift', select: 'name' }
    ]);
    const documents = syntheticTimekeeping(data);
    const dataz = [];
    const arr1 = ['STT', 'Nhân viên', 'Mã NV', 'Ca làm việc', 'Công OT', 'Tổng công', 'Thực tế'];
    const arr2 = ['STT', 'Nhân viên', 'Mã NV', 'Ca làm việc', 'Công OT', 'Tổng công', 'Thực tế'];
    const dates = getDates(fromDate, toDate);
    dates.forEach((date) => {
      arr1.push(days[new Date(date).getDay()]?.name);
      arr2.push(moment(date).format('DD/MM'));
    });

    dataz.push(arr1);
    dataz.push(arr2);
    if (documents?.length > 0) {
      let index = 1;
      for (const datum of documents) {
        const arr = [index, datum.account?.fullName, datum.account?.staffCode, datum.shift?.name, datum.totalOt, datum.total, datum.reality];
        dates.forEach((date) => {
          const datez = datum.data?.find((d) => formatDate(d.date, 'date') === formatDate(date, 'date'));
          arr.push(datez ? datez.summary || '-' : '');
        });
        dataz.push(arr);
        index += 1;
      }
    }
    const options = {
      mergeCells: ['A1:A2', 'B1:B2', 'C1:C2', 'D1:D2', 'E1:E2', 'F1:F2'],
      alignments: [
        { A1: { horizontal: 'center', vertical: 'middle' } },
        { B1: { horizontal: 'center', vertical: 'middle' } },
        { C1: { horizontal: 'center', vertical: 'middle' } },
        { D1: { horizontal: 'center', vertical: 'middle' } },
        { E1: { horizontal: 'center', vertical: 'middle' } },
        { F1: { horizontal: 'center', vertical: 'middle' } }
      ]
    };
    res
      .status(200)
      .attachment('file.xlsx')
      .send(await convertToExcel(dataz, options));
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const importTimekeeping = async (req, res) => {
  try {
    if (req.file) {
      const attributes = ['stt', 'deviceCode', 'staffCode', 'shiftCode', 'date', 'checkInTime', 'checkOutTime'];
      const data = await handleFileExcel(req.file, attributes);
      if (data?.length > 0) {
        for (const datum of data) {
          const { stt, deviceCode, staffCode, shiftCode, date, checkInTime, checkOutTime } = datum;
          if (!stt) {
            datum.mess = 'Số thứ tự không được bỏ trống';
            continue;
          }
          if (!deviceCode) {
            datum.mess = 'Mã máy chấm công không được bỏ trống';
            continue;
          }
          if (!staffCode) {
            datum.mess = 'Mã nhân viên không được bỏ trống';
            continue;
          }
          if (!shiftCode) {
            datum.mess = 'Mã ca làm việc không được bỏ trống';
            continue;
          }
          if (!date) {
            datum.mess = 'Ngày chấm công không được bỏ trống';
            continue;
          }
          datum.date = moment(datum.date).format("YYYY-MM-DD")
          if (!checkInTime) {
            datum.mess = 'Thời gian vào không được bỏ trống';
            continue;
          }
          if (!checkValidTime(checkInTime)) {
            datum.mess = `Thời gian vào không đúng định dạng HH:mm`;
            continue;
          }
          if (checkOutTime && !checkValidTime(checkOutTime)) {
            datum.mess = `Thời gian ra không đúng định dạng HH:mm`;
            continue;
          }
          const device = await detailDeviceMd({ code: deviceCode });
          if (!device) {
            datum.mess = `Không tìm thấy máy chấm công có mã ${deviceCode}`;
            continue;
          }
          const account = await detailAccountMd({ staffCode });
          if (!account) {
            datum.mess = `Không tìm thấy nhân viên có mã ${staffCode}`;
            continue;
          }
          const shift = await detailShiftMd({ code: shiftCode });
          if (!shift) {
            datum.mess = `Không tìm thấy ca làm việc có mã ${shiftCode}`;
            continue;
          }
          if (!device.departments?.includes(String(account.department))) {
            datum.mess = `Nhân sự không được chấm công tại máy có mã ${deviceCode}`;
            continue;
          }
          console.log({ account: account._id, date: datum.date, shift: shift._id });
          
          const timekeeping = await detailTimekeepingMd({ account: account._id, date: datum.date, shift: shift._id });
          if (!timekeeping) {
            datum.mess = `Nhân sự không có ca làm việc trong ngày ${formatDate(datum.date, 'date')}`;
            continue;
          }
          await updateTimekeepingMd({ _id: timekeeping._id }, { ...calTimekeeping(timekeeping, checkInTime, checkOutTime) });
        }
      }
      const dataz = [];
      dataz.push([
        'STT',
        'Mã máy chấm công',
        'Mã nhân viên',
        'Mã ca làm việc',
        'Ngày chấm công',
        'Thời gian vào',
        'Thời gian ra',
        'Trạng thái',
        'Thông báo'
      ]);
      if (data && data.length > 0) {
        for (const datum of data) {
          dataz.push([
            datum.stt,
            datum.deviceCode,
            datum.staffCode,
            datum.shiftCode,
            formatDate(datum.date, 'date'),
            datum.checkInTime,
            datum.checkOutTime,
            datum.mess ? 'Thất bại' : 'Thành công',
            datum.mess || 'Import máy chấm công thành công'
          ]);
          await createImportLogMd({
            ...datum,
            timeStart: datum.checkInTime,
            timeEnd: datum.checkOutTime,
            status: datum.mess ? 0 : 1,
            by: req.account?._id
          });
        }
      }
      res
        .status(200)
        .attachment('file.xlsx')
        .send(await convertToExcel(dataz));
    } else res.json({ status: 0, mess: 'Vui lòng truyền file excel!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

//====================================App====================================
export const checkTimekeepingApp = async (req, res) => {
  try {
    const { error, value } = validateData(checkTimekeepingAppValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    if (!req.file) return res.json({ status: 0, mess: 'Vui lòng truyền hình ảnh!' });
    const { status, mess, data } = await checkFace(req.file);
    if (status && String(data) === String(req.account?._id)) {
      res.json({
        status: 1,
        data: await createTimekeepingLogMd({ ...value, account: req.account?._id, department: req.account?.department?._id, date: databaseDate(value.date, 'date') })
      });
    } else res.json({ status: 0, mess: mess || 'Không tìm thấy nhân viên!' });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListTimekeepingLogApp = async (req, res) => {
  try {
    const { error, value } = validateData(listTimekeepingLogAppValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { date, shift } = value;
    const where = { account: req.account?._id, date, shift };
    res.json({ status: 1, data: await listTimekeepingLogMd(where) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListTimekeepingApp = async (req, res) => {
  try {
    const { error, value } = validateData(listTimekeepingAppValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { fromDate, toDate, shift } = value;
    const where = {
      account: req.account?._id,
      date: {
        $gte: fromDate,
        $lte: toDate
      },
      shift
    };
    res.json({ status: 1, data: await listTimekeepingMd(where) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSyntheticTimekeepingApp = async (req, res) => {
  try {
    const { error, value } = validateData(listTimekeepingAppValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { fromDate, toDate, shift } = value;
    const where = {
      account: req.account?._id,
      date: {
        $gte: fromDate,
        $lte: toDate
      },
    };
    if (shift) where.shift = shift
    const data = await listTimekeepingMd(where);
    res.json({ status: 1, data: syntheticTimekeeping(data) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
