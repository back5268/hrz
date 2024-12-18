import { days } from '@constant';
import { convertToExcel, handleFileExcel } from '@lib/excel-js';
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
  detailShiftMd,
  listTimekeepingMd,
  listTimekeepingLogMd,
  updateTimekeepingMd,
  createImportLogMd,
  detailConfigMd
} from '@repository';
import { calTimekeeping, checkTimekeepingRp, syntheticTimekeeping } from '@service';
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
      { path: 'department', select: 'name' }
    ]);
    const dataz = [];
    dataz.push(['STT', 'Phòng ban', 'Nhân viên', 'Mã NV', 'Ngày', 'Ngày trong tuần', 'Thời gian', 'Thiết bị chấm công']);
    if (data?.length > 0) {
      let index = 1;
      for (const datum of data) {
        dataz.push([
          index,
          datum.department?.name,
          datum.account?.fullName,
          datum.account?.staffCode,
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
        const arr = [
          index,
          datum.account?.fullName,
          datum.account?.staffCode,
          datum.shift?.name,
          datum.totalOt,
          datum.total,
          datum.reality
        ];
        dates.forEach((date) => {
          const datez = datum.data?.find((d) => formatDate(d.date, 'date') === formatDate(date, 'date'));
          arr.push(datez ? datez.summary || '-' : '');
        });
        dataz.push(arr);
        index += 1;
      }
    }
    const options = {
      mergeCells: ['A1:A2', 'B1:B2', 'C1:C2', 'D1:D2', 'E1:E2', 'F1:F2', 'G1:G2'],
      alignments: [
        { A1: { horizontal: 'center', vertical: 'middle' } },
        { B1: { horizontal: 'center', vertical: 'middle' } },
        { C1: { horizontal: 'center', vertical: 'middle' } },
        { D1: { horizontal: 'center', vertical: 'middle' } },
        { E1: { horizontal: 'center', vertical: 'middle' } },
        { F1: { horizontal: 'center', vertical: 'middle' } },
        { G1: { horizontal: 'center', vertical: 'middle' } }
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
          datum.date = moment(datum.date).format('YYYY-MM-DD');
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
          const timekeepings = await listTimekeepingMd({ account: account._id, date: datum.date, shift: shift._id });
          if (!(timekeepings?.length > 0)) {
            datum.mess = `Nhân sự không có ca làm việc trong ngày ${formatDate(datum.date, 'date')}`;
            continue;
          }
          for (const timekeeping of timekeepings) {
            if (!timekeeping) continue;
            const logs = await listTimekeepingLogMd({ account: account._id, date: datum.date });
            const log1 = logs[logs.length - 1];
            const log2 = logs[0];
            let times = [log1?.time, log2?.time, checkInTime, checkOutTime].filter(b => b)
            
            times = times.sort((a, b) => {
              const [hourA, minuteA] = a.split(":").map(Number); // Tách giờ và phút cho a
              const [hourB, minuteB] = b.split(":").map(Number); // Tách giờ và phút cho b
              return hourA - hourB || minuteA - minuteB;
            });
            const checkInTimez = times[0]
            const checkOutTimez = times[times.length - 1]
            await updateTimekeepingMd(
              { _id: timekeeping._id },
              { ...calTimekeeping(timekeeping, checkInTimez, checkOutTimez) }
            );
          }
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
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

//====================================App====================================
export const checkTimekeepingApp = async (req, res) => {
  try {
    const { error, value } = validateData(checkTimekeepingAppValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    if (!req.file) return res.json({ status: 0, mess: 'Vui lòng truyền hình ảnh!' });
    const { latitude, longitude } = value;
    const timekeepingConfig = await detailConfigMd({ type: 1 });
    const locations = timekeepingConfig?.timekeeping?.locations;
    if (Array.isArray(locations) && locations.length) {
      let checkLocation = false;
      locations.forEach((l) => {
        const latCheck = l.latitude;
        const longCheck = l.longitude;
        const value = 1000 / 111000;
        if (latitude < latCheck + value && latitude > latCheck - value && longitude < longCheck + value && longitude > longCheck - value)
          checkLocation = true;
      });
      if (!checkLocation) return res.json({ status: 1, data: { mess: 'Vị trí chấm công không đúng!' } });
    } else return res.json({ status: 1, data: { mess: 'Vị trí chấm công không đúng!' } });
    const { status, data } = await checkFace(req.file);
    if (status && String(data) === String(req.account?._id)) {
      const date = databaseDate(value.date, 'date');
      const data = await createTimekeepingLogMd({
        ...value,
        account: req.account?._id,
        department: req.account?.department?._id,
        date
      });
      await checkTimekeepingRp({ account: req.account?._id, date, time: value.time });
      res.json({
        status: 1,
        data
      });
    } else res.json({ status: 1, data: { mess: 'Khuôn mặt không đúng!' } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListTimekeepingLogApp = async (req, res) => {
  try {
    const { error, value } = validateData(listTimekeepingLogAppValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { date } = value;
    const where = { account: req.account?._id, date };
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
      }
    };
    if (shift) where.shift = shift;
    const data = await listTimekeepingMd(where);
    res.json({ status: 1, data: syntheticTimekeeping(data) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
