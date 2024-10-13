import { dateData } from '@constant';
import { createScheduleMd, listAccountMd } from '@models';
import moment from 'moment';

export const createScheduleByShift = async (shift) => {
  const departments = shift.departments;
  const accounts = await listAccountMd({ department: { $in: departments } });
  const startDate = moment(shift?.dateStart);
  const endDate = shift?.dateEnd ? moment(shift?.dateEnd) : moment(startDate).add(1, 'months');
  const duration = moment.duration(endDate.diff(startDate));
  const days = duration.asDays() + 1;
  const arr = new Array(days).fill(null);
  if (arr?.length > 0) {
    let index = 0;
    for (let i of arr) {
      const date = startDate.clone().add(index, 'days').format('YYYY-MM-DD');
      index += 1;
      const day = dateData[new Date(date).getDay()] || '';
      const dates = shift.dates;
      const info = dates.find((d) => d.date === day);
      if (!day || !info) continue;
      for (const account of accounts) {
        const params = {
          department: account.department,
          account: account._id,
          shift: shift._id,
          date,
          timeStart: info.timeStart,
          timeEnd: info.timeEnd,
          timeBreakStart: info.timeBreakStart,
          timeBreakEnd: info.timeBreakEnd,
          totalTime: info.totalTime,
          totalWork: info.totalWork
        };
        await createScheduleMd(params);
      }
    }
  }
};
