import { getListScheduleApi, getListShiftInfoApi } from '@api';
import { DataFilter, FormList } from '@components/base';
import { Dropdownzz } from '@components/core';
import { sheduleTypes, weeks } from '@constant';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import moment from 'moment';
import { useEffect, useState } from 'react';

const getWeekData = (year = 2024) => {
  const weeks = [];
  const firstDayOfYear = new Date(year, 0, 1);
  let currentDay = new Date(firstDayOfYear);
  while (currentDay.getDay() !== 1) {
    currentDay.setDate(currentDay.getDate() + 1);
  }
  let weekNumber = 1;
  while (currentDay.getFullYear() === year) {
    let startOfWeek = new Date(currentDay);
    let endOfWeek = new Date(currentDay);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    if (endOfWeek.getFullYear() !== year) {
      endOfWeek = new Date(year, 11, 31);
    }
    const key = `${startOfWeek.toLocaleDateString('en-GB')} To ${endOfWeek.toLocaleDateString('en-GB')}`;
    weeks.push({ name: key, _id: key });
    currentDay.setDate(currentDay.getDate() + 7);
    weekNumber++;
  }
  return weeks;
};

const getYearData = () => {
  const years = [];
  let year = new Date().getFullYear() - 2;
  for (let i = 0; i < 5; i++) {
    years.push({ name: String(year + i), _id: year + i });
  }
  return years;
};

const getCurrentWeek = (year = 2024) => {
  const today = new Date();
  const todayz = new Date(year || today.getFullYear(), today.getMonth(), today.getDate());
  const firstDayOfWeek = new Date(todayz);
  const dayOfWeek = todayz.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  firstDayOfWeek.setDate(todayz.getDate() + diffToMonday);
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  return `${firstDayOfWeek.toLocaleDateString('en-GB')} To ${lastDayOfWeek.toLocaleDateString('en-GB')}`;
};

const getDatesByWeek = (week) => {
  const arr = week?.split(' To ');
  const days = [];
  const startDate = moment(arr?.[0], 'DD/MM/YYYY');
  const endDate = moment(arr?.[1], 'DD/MM/YYYY');
  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate)) {
    days.push(currentDate.format('DD/MM'));
    currentDate.add(1, 'days');
  }
  return days;
};

const handleParams = (params) => {
  if (params.week) {
    const arr = params.week?.split(' To ');
    params.fromDate = moment(arr?.[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
    params.toDate = moment(arr?.[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
  return { ...params, week: undefined, year: undefined };
};

const Header = ({ currentWeek }) => {
  return (
    <div className="w-full grid grid-cols-10">
      <div className="col-span-3">
        <div className="grid grid-cols-2">
          <div className="border border-border h-20 flex justify-center items-center uppercase font-semibold text-primary">Nhân viên</div>
          <div className="border border-border h-20 flex justify-center items-center uppercase font-semibold text-primary">
            Ca làm việc
          </div>
        </div>
      </div>
      <div className="col-span-7 text-white bg-primary">
        <div className="grid grid-cols-7">
          {weeks?.map((w, index) => {
            return (
              <div key={index} className="border border-white h-10 flex justify-center items-center">
                {w}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7">
          {getDatesByWeek(currentWeek)?.map((w, index) => {
            return (
              <div key={index} className="border border-white h-10 flex justify-center items-center">
                {w}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Body = ({ schedule = [], accounts = [], shifts = [] }) => {
  return (
    <>
      {Array.isArray(schedule) &&
        schedule.map((item, index) => {
          return (
            <div key={index} className="w-full grid grid-cols-10 items-center">
              <div className="col-span-3 h-full">
                <div className="grid grid-cols-2 h-full">
                  <div
                    className={`border border-border flex justify-center items-center uppercase font-semibold text-primary row-span-${item.data?.length}`}
                  >
                    {accounts?.find((account) => account._id === item.account)?.fullName}
                  </div>
                  {item.data?.map((datum, index) => (
                    <div
                      key={index}
                      className="border border-border flex gap-2 justify-center items-center uppercase font-semibold text-primary"
                    >
                      {shifts?.find((shift) => shift._id === datum.shift)?.code}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-7">
                {item.data?.map((datum, index) => (
                  <div key={index} className="grid grid-cols-7">
                    {weeks?.map((_w, index) => {
                      const date = datum.data?.find(d => new Date(d.date).getDay() === index)
                      const title = date ? `${date.timeStart} - ${date.timeEnd}` : ""
                      return (
                        <div key={index} className="border border-border h-10 flex justify-center items-center">
                          {title}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
};

const INITDATA = { year: new Date().getFullYear(), week: getCurrentWeek(new Date().getFullYear()) };
export const Schedule = () => {
  const { accounts, departments } = useDataState();
  const [params, setParams] = useState(INITDATA);
  const [weeks, setWeeks] = useState({});
  const [filter, setFilter] = useState({ year: new Date().getFullYear() });
  const { isLoading, data } = useGetApi(getListScheduleApi, handleParams(params), 'schedule');
  const { data: shifts } = useGetApi(getListShiftInfoApi, handleParams(params), 'shifts');
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const newData = [];
      data.forEach((datum) => {
        const index = newData.findIndex((n) => n.account === datum.account);
        if (index >= 0) {
          const dataz = newData[index].data;
          const indexz = dataz.findIndex((d) => d.shift === datum.shift);
          if (indexz >= 0) newData[index].data[indexz].data.push(datum);
          else newData[index].data.push({ shift: datum.shift, data: [datum] });
        } else {
          newData.push({ account: datum.account, data: [{ shift: datum.shift, data: [datum] }] });
        }
      });
      setSchedule(newData);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    setWeeks(getWeekData(filter.year));
    setFilter((pre) => ({ ...pre, week: getCurrentWeek(filter.year) }));
  }, [filter.year]);

  return (
    <FormList title="Lịch làm việc">
      <DataFilter
        setParams={setParams}
        filter={filter}
        setFilter={setFilter}
        handleClear={() => {
          setParams(INITDATA);
          setFilter(INITDATA);
        }}
        handleFilter={() => setParams(filter)}
        className="lg:w-9/12"
      >
        <Dropdownzz
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
          options={getYearData()}
          label="Năm"
        />
        <Dropdownzz value={filter.week} onChange={(e) => setFilter({ ...filter, week: e.target.value })} options={weeks} label="Tuần" />
        <Dropdownzz
          value={filter.department}
          onChange={(e) => setFilter({ ...filter, department: e.target.value, account: undefined })}
          options={departments}
          label="Phòng ban"
          showClear
          filter
        />
        <Dropdownzz
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          options={filter.department ? accounts.filter((a) => a.department === filter.department) : accounts}
          optionLabel="fullName"
          label="Nhân viên"
          showClear
        />
        <Dropdownzz
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          options={sheduleTypes}
          label="Loại ca làm việc"
          showClear
        />
      </DataFilter>
      <div className="w-full px-2 mt-12">
        <Header currentWeek={params.week} />
        <Body schedule={schedule} accounts={accounts} shifts={shifts} />
      </div>
    </FormList>
  );
};
