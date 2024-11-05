export const approveApplication = async (dataz) => {
  const type = dataz.type;
  if (type === 1) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift });
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
      await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
    }
  } else if (type === 4) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift });
    await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
  } else if (type === 5) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, date: dataz.dates?.[0], shift: dataz.shift });
    const timeStart = addTimes(timekeeping.timeStart, dataz.late);
    const timeEnd = subtractTimes(timekeeping.timeEnd, dataz.soon);
    await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, timeStart, timeEnd });
  } else if (type === 6) {
    const timekeeping = await detailTimekeepingMd({ account: dataz.account, shift: dataz.shift });
    const totalTime = calTime(`2024-11-01 ${dataz.fromTime}:00`, `2024-11-01 ${dataz.toTime}:00`);
    const totalWork = (timekeeping.totalWork / timekeeping.totalTime) * totalTime;
    await createTimekeepingMd({
      department: dataz.department,
      account: dataz.account,
      shift: dataz.shift,
      date: dataz.dates?.[0],
      timeStart: dataz.fromTime,
      timeEnd: dataz.toTime,
      totalTime,
      totalWork,
      type: 2
    });
  } else if (type === 7) {
    const dates = dataz.dates;
    for (const date of dates) {
      const timekeeping = await detailTimekeepingMd({ account: dataz.account, date, shift: dataz.shift });
      await updateTimekeepingMd({ _id: timekeeping._id }, { $addToSet: { applications: dataz._id }, summary: timekeeping.totalWork });
    }
  }
};
