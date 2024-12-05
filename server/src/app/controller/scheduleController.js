import { days } from '@constant';
import { convertToExcel } from '@lib/excel-js';
import { listAccountMd } from '@repository';
import { getListScheduleService } from '@service';
import { getDates } from '@utils';
import moment from 'moment';

export const getListSchedule = async (req, res) => {
  try {
    const data = await getListScheduleService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const exportSchedule = async (req, res) => {
  try {
    const data = await getListScheduleService(req);
    const dataz = [];
    const arr1 = ['STT', 'Nhân viên', 'Mã NV', 'Ca làm việc', 'Chính thức', 'OT'];
    const arr2 = ['STT', 'Nhân viên', 'Mã NV', 'Ca làm việc', 'Số giờ/Số công', 'Số giờ/Số công'];
    const dates = getDates(req.query?.fromDate, req.query?.toDate);
    dates.forEach((date) => {
      arr1.push(days[new Date(date).getDay()]?.name);
      arr2.push(moment(date).format('DD/MM'));
    });

    const accounts = await listAccountMd();
    dataz.push(arr1);
    dataz.push(arr2);
    if (data?.length > 0) {
      let index = 1;
      for (const datum of data) {
        const account = accounts.find((a) => String(a._id) === datum.account);
        const arr = [
          index,
          account?.fullName,
          account?.staffCode,
          datum.shift?.name,
          `${datum.totalTime} / ${datum.totalWork}`,
          `${datum.totalTimeOt} / ${datum.totalWorkOt}`
        ];
        dates.forEach((date) => {
          const day = days[new Date(date).getDay()]._id
          let title = ``;
          datum[day]?.forEach((d) => {
            title += d.title;
          });
          arr.push(title);
        });
        dataz.push(arr);
        index += 1;
      }
    }
    const options = {
      mergeCells: ['A1:A2', 'B1:B2', 'C1:C2', 'D1:D2'],
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
    res.status(500).json({ status: 0, mess: error.message });
  }
};
