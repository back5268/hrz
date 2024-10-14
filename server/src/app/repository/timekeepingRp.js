import { convertTimeToDate } from '@utils';

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
      let late = latez / (1000 * 60 * 60);
      object.late = late;
      miss += late;
    } else object.late = 0;
    if (soonz > 0) {
      let soon = soonz / (1000 * 60 * 60);
      object.soon = soon;
      miss += soon;
    } else object.soon = 0;

    const totalTimeReality = totalTime - miss > 0 ? totalTime - miss : 0;
    const totalWorkReality = (totalTimeReality / totalTime) * totalWork;
    object.totalTimeReality = totalTimeReality;
    object.totalWorkReality = totalWorkReality;
    object.summary = totalWorkReality;
  } else {
    object.totalTimeReality = 0;
    object.totalWorkReality = 0;
    object.summary = 0;
  }
  return object;
};

export const syntheticTimekeeping = (data = []) => {
  const dataz = [];
  data.forEach((datum) => {
    const index = dataz.findIndex((n) => String(n.account) === String(datum.account) && String(n.shift) === String(datum.shift));
    if (index >= 0) {
      dataz[index].total += datum.totalWork;
      dataz[index].reality += Number(datum.summary) || 0;
      dataz[index].data.push(datum);
    } else
      dataz.push({
        account: datum.account,
        shift: datum.shift,
        total: datum.totalWork,
        reality: Number(datum.summary) || 0,
        data: [datum]
      });
  });
  return dataz;
};
