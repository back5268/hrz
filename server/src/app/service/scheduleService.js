import { days } from '@constant';
import { listScheduleValid } from '@lib/validation';
import { listShiftMd, listTimekeepingMd } from '@repository';
import { validateData } from '@utils';
import moment from 'moment';

export const handSchedule = async (data = []) => {
  if (Array.isArray(data)) {
    const shifts = await listShiftMd();
    const newData = [],
      dataz = [];
    data.forEach((datum) => {
      const index = newData.findIndex((n) => String(n.account) === String(datum.account) && String(n.shift) === String(datum.shift));
      if (index >= 0) newData[index].data.push(datum);
      else newData.push({ account: String(datum.account), shift: String(datum.shift), data: [datum] });
    });

    newData.forEach((n) => {
      const object = {};
      const data = n.data;
      const shift = shifts?.find((s) => String(s._id) === String(n.shift));
      let totalTime = 0,
        totalTimeOt = 0,
        totalWork = 0,
        totalWorkOt = 0;
      data.forEach((datum) => {
        if (datum.type === 2) {
          totalTimeOt += datum.totalTime;
          totalWorkOt += datum.totalWork;
        } else {
          totalTime += datum.totalTime;
          totalWork += datum.totalWork;
        }
        const title = `${datum.timeStart} - ${datum.timeEnd}`;
        const day = days[moment(datum.date).day()];
        if (object[day._id]) object[day._id].push({ type: datum.type, title, totalWork: datum.totalWork, totalTime: datum.totalTime });
        else object[day._id] = [{ type: datum.type, title, totalWork: datum.totalWork, totalTime: datum.totalTime }];
      });
      dataz.push({ ...n, ...object, shift, totalTime, totalTimeOt, totalWork, totalWorkOt });
    });
    return dataz;
  } else return [];
};

export const getListScheduleService = async (req) => {
  const { error, value } = validateData(listScheduleValid, req.query);
  if (error) throw new Error(error);
  const { type, department, account, shift, fromDate, toDate } = value;
  const where = {};
  if (type) where.type = type;
  if (department) where.department = department;
  if (account) where.account = account;
  if (shift) where.shift = shift;
  if (fromDate && toDate)
    where.date = {
      $gte: fromDate,
      $lte: toDate
    };
  const data = await listTimekeepingMd(where);
  return await handSchedule(data);
};
