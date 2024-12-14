import { listTimekeepingLogMd, listTimekeepingMd, updateTimekeepingMd } from '@repository';
import { convertTimeToDate, roundNumber } from '@utils';

export const calTimekeeping = (schedule = {}, checkInTime, checkOutTime) => {
  const { timeStart, timeEnd, timeBreakStart, timeBreakEnd, totalTime, totalWork } = schedule;
  const object = { checkInTime, checkOutTime };
  if (checkInTime && checkOutTime) {
    let miss = 0;
    const start = convertTimeToDate(timeStart);
    const end = convertTimeToDate(timeEnd);
    const breakStart = convertTimeToDate(timeBreakStart);
    const breakEnd = convertTimeToDate(timeBreakEnd);
    const checkIn = convertTimeToDate(checkInTime);
    const checkout = convertTimeToDate(checkOutTime);
    let latez = 0,
      soonz = 0;
    if (checkIn > start) {
      if (checkIn > breakEnd) {
        latez = checkIn - (breakEnd - breakStart) - start;
      } else if (checkIn > breakStart && checkIn < breakEnd) latez = breakStart - start;
      else latez = checkIn - start;
    }
    if (checkout < end) {
      if (checkout < breakStart) {
        soonz = end - (breakEnd - breakStart) - checkout;
      } else if (checkout > breakStart && checkout < breakEnd) soonz = end - breakEnd;
      else soonz = end - checkout;
    }
    if (latez > 0) {
      let late = roundNumber(latez / (1000 * 60 * 60));
      object.late = late;
      miss += late;
    } else object.late = 0;
    if (soonz > 0) {
      let soon = roundNumber(soonz / (1000 * 60 * 60));
      object.soon = soon;
      miss += soon;
    } else object.soon = 0;

    const totalTimeReality = totalTime - miss > 0 ? totalTime - miss : 0;
    const totalWorkReality = (totalTimeReality / totalTime) * totalWork;
    object.totalTimeReality = totalTimeReality;
    object.totalWorkReality = roundNumber(totalWorkReality);
    object.summary = roundNumber(totalWorkReality);
  } else {
    if (checkInTime) {
      const start = convertTimeToDate(timeStart);
      const breakStart = convertTimeToDate(timeBreakStart);
      const breakEnd = convertTimeToDate(timeBreakEnd);
      const checkIn = convertTimeToDate(checkInTime);
      let latez = 0;
      if (checkIn > start) {
        if (checkIn > breakEnd) {
          latez = checkIn - (breakEnd - breakStart) - start;
        } else if (checkIn > breakStart && checkIn < breakEnd) latez = breakStart - start;
        else latez = checkIn - start;
        if (latez > 0) {
          let late = latez / (1000 * 60 * 60);
          object.late = roundNumber(late);
        }
      }
    }
    object.totalTimeReality = 0;
    object.totalWorkReality = 0;
    object.summary = 0;
  }
  return object;
};

export const syntheticTimekeeping = (data = []) => {
  const dataz = [];
  data.forEach((datum) => {
    const index = dataz.findIndex(
      (n) => String(n.account?._id) === String(datum.account?._id) && String(n.shift?._id) === String(datum.shift?._id)
    );
    datum.summary = roundNumber(datum.summary || 0);
    datum.totalWork = roundNumber(datum.totalWork || 0);
    if (datum.type === 2) {
      datum.timeStartOt = datum.timeStart;
      datum.timeEndOt = datum.timeEnd;
      datum.timeStart = undefined;
      datum.timeEnd = undefined;
    }
    if (index >= 0) {
      if (datum.type === 1) {
        dataz[index].reality += datum.summary;
        dataz[index].total += datum.totalWork;
      } else if (datum.type === 2) {
        dataz[index].realityOt += datum.summary;
        dataz[index].totalOt += datum.totalWork;
      }
      const checkDate = dataz[index].data?.findIndex((d) => d.date === datum.date);
      if (checkDate >= 0) {
        const datumz = dataz[index].data[checkDate];
        dataz[index].data[checkDate] = {
          ...datumz,
          ...datum,
          summary: roundNumber(datumz.summary) + roundNumber(datum.summary),
          applications: [...datumz.applications, ...datum.applications],
          type: 2
        };
      } else dataz[index].data.push(datum);
    } else
      dataz.push({
        account: datum.account,
        shift: datum.shift,
        total: datum.type === 1 ? datum.totalWork : 0,
        totalOt: datum.type === 2 ? datum.totalWork : 0,
        reality: datum.type === 1 ? datum.summary : 0,
        realityOt: datum.type === 2 ? datum.summary : 0,
        data: [datum]
      });
  });
  return dataz;
};

export const checkTimekeepingRp = async (data) => {
  const { account, date, time } = data;
  const timekeepings = await listTimekeepingMd({ account, date });
  const logs = await listTimekeepingLogMd({ account, date });
  const log1 = logs[logs.length - 1];
  const log2 = logs[0];
  for (const timekeeping of timekeepings) {
    if (!timekeeping) continue;
    const checkInTime = log1?.time || time;
    const checkOutTime = log2?.time || time;
    await updateTimekeepingMd({ _id: timekeeping._id }, { ...calTimekeeping(timekeeping, checkInTime, checkOutTime) });
  }
};
