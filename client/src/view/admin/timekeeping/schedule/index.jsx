import { getListScheduleApi, getListShiftInfoApi } from '@api';
import { DataFilter, FormList } from '@components/base';
import { Dropdownzz } from '@components/core';
import { sheduleTypes, days } from '@constant';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import { themeColor } from '@theme';
import moment from 'moment';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Row } from 'primereact/row';
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

const getDaysByWeek = (week) => {
  const arr = week?.split(' To ');
  const dayz = [];
  const startDate = moment(arr?.[0], 'DD/MM/YYYY');
  const endDate = moment(arr?.[1], 'DD/MM/YYYY');
  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate)) {
    dayz.push(days[currentDate.day()]);
    currentDate.add(1, 'days');
  }
  return dayz;
};

const handleParams = (params) => {
  if (params.week) {
    const arr = params.week?.split(' To ');
    params.fromDate = moment(arr?.[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
    params.toDate = moment(arr?.[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
  return { ...params, week: undefined, year: undefined };
};

const INITPARAMS = { year: new Date().getFullYear(), week: getCurrentWeek(new Date().getFullYear()) };
export const Schedule = () => {
  const { accounts, departments } = useDataState();
  const [params, setParams] = useState(INITPARAMS);
  const [weekData, setWeekData] = useState({});
  const [filter, setFilter] = useState({ year: new Date().getFullYear() });
  const { isLoading, data } = useGetApi(getListScheduleApi, handleParams(params), 'schedule');
  const { data: shifts } = useGetApi(getListShiftInfoApi, {}, 'shifts');
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const newData = [],
        dataz = [];
      data.forEach((datum) => {
        const index = newData.findIndex((n) => n.account === datum.account && n.shift === datum.shift);
        if (index >= 0) newData[index].data.push(datum);
        else newData.push({ account: datum.account, shift: datum.shift, data: [datum] });
      });
      newData.forEach((n) => {
        const object = {};
        const data = n.data;
        const shift = shifts.find((s) => s._id === n.shift);
        let totalTime = 0, totalTimeOt = 0, totalWork = 0, totalWorkOt = 0; 
        data.forEach((datum) => {
          if (datum.type === 2) {
            totalTimeOt += datum.totalTime
            totalWorkOt += datum.totalWork
          } else {
            totalTime += datum.totalTime
            totalWork += datum.totalWork
          }
          const title = `${datum.timeStart} - ${datum.timeEnd}`;
          const day = days[moment(datum.date).day()];
          if (object[day._id]) object[day._id].push({ type: datum.type, title, totalWork: datum.totalWork, totalTime: datum.totalTime });
          else object[day._id] = [{ type: datum.type, title, totalWork: datum.totalWork, totalTime: datum.totalTime }];
        });
        dataz.push({ ...n, ...object, shift, totalTime, totalTimeOt, totalWork, totalWorkOt });
      });
      setSchedule(dataz);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    setWeekData(getWeekData(filter.year));
    setFilter((pre) => ({ ...pre, week: getCurrentWeek(filter.year) }));
  }, [filter.year]);

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Nhân viên" rowSpan={2} />
        <Column header="Ca làm việc" rowSpan={2} />
        <Column header="Chính thức" />
        <Column header="OT" />
        {getDaysByWeek(params.week).map((w, index) => (
          <Column key={index} header={w.name} />
        ))}
      </Row>
      <Row>
      <Column header="Số giờ / Số Công" />
      <Column header="Số giờ / Số Công" />
        {getDatesByWeek(params.week).map((w, index) => (
          <Column key={index} header={w} />
        ))}
      </Row>
    </ColumnGroup>
  );

  return (
    <FormList title="Lịch làm việc">
      <DataFilter
        setParams={setParams}
        filter={filter}
        setFilter={setFilter}
        handleClear={() => {
          setParams(INITPARAMS);
          setFilter(INITPARAMS);
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
        <Dropdownzz value={filter.week} onChange={(e) => setFilter({ ...filter, week: e.target.value })} options={weekData} label="Tuần" />
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
      <div className="w-full px-2">
        <DataTable
          loading={isLoading}
          value={schedule}
          headerColumnGroup={headerGroup}
          rowGroupMode="rowspan"
          groupRowsBy="account"
          sortMode="single"
          sortField="account"
          sortOrder={1}
          showGridlines
          scrollable
          emptyMessage="Không có nhân viên làm việc trong khoảng thời gian này"
        >
          <Column
            field="account"
            className="min-w-52"
            body={(e) => {
              const account = accounts.find((a) => a._id === e.account);
              return (
                <div className="flex justify-start items-center gap-4">
                  <div className="h-12 w-12">
                    <img
                      alt={account.fullName}
                      src={account.avatar || '/images/avatar.jpg'}
                      className="rounded-md h-12 w-12 object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-1 text-primary">
                    <span className="font-semibold">{account.fullName}</span>
                    <span className="font-semibold">{account.staffCode}</span>
                  </div>
                </div>
              );
            }}
          ></Column>
          <Column
            field="shift.code"
            body={(e) => (
              <span className="font-medium text-primary">
                {e.shift?.name} ({e.shift?.code})
              </span>
            )}
            className="min-w-28"
          ></Column>
          <Column body={(e) => <span className="font-medium">
            {e.totalTime} / {e.totalWork}
          </span>} className="min-w-28"></Column>
          <Column body={(e) => <span className="font-medium">
            {e.totalTimeOt} / {e.totalWorkOt}
          </span>} className="min-w-28"></Column>
          {getDaysByWeek(params.week).map((work, index) => (
            <Column
              key={index}
              field={work._id}
              body={(e) =>
                e[work._id]?.map((w, index) => (
                  <div
                    key={index}
                    className="h-8 flex justify-center items-center"
                    style={{
                      backgroundColor: w.type === 2 ? themeColor.primaryContainer : '',
                      color: w.type === 2 ? themeColor.primary : ''
                    }}
                  >
                    {w.title}
                  </div>
                ))
              }
              className="min-w-28 !p-0"
            ></Column>
          ))}
        </DataTable>
      </div>
    </FormList>
  );
};
