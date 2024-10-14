import { createShiftApi, detailShiftApi, updateShiftApi } from '@api';
import { FormDetail } from '@components/base';
import { CalendarFormz, InputFormz, MultiSelectFormz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { ShiftValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Dates } from './Dates';
import moment from 'moment';
import { useDataState } from '@store';

const defaultValues = {
  name: '',
  code: '',
  departments: ''
};

const convertTimeToDate = (time) => {
  return new Date(`2024-01-01 ${time}:00`)
};

const databaseDateToTime = (date) => {
  return moment(date).format('HH:mm');
};

export const DetailShift = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailShiftApi, { _id }, 'shiftz', isUpdate);
  const [dates, setDates] = useState([]);
  const { departments } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ShiftValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.dateStart) setValue('dateStart', new Date(item.dateStart));
      if (item.dateEnd) setValue('dateEnd', new Date(item.dateEnd));
      if (item.dates)
        setDates(
          item.dates.map((i, index) => ({
            ...i,
            idz: index + 1,
            timeStart: convertTimeToDate(i.timeStart),
            timeEnd: convertTimeToDate(i.timeEnd),
            timeBreakStart: convertTimeToDate(i.timeBreakStart),
            timeBreakEnd: convertTimeToDate(i.timeBreakEnd)
          }))
        );
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  console.log(dates);
  

  const handleData = (data) => {
    const newData = {
      ...data,
      dates: dates.map((date) => ({
        ...date,
        timeStart: databaseDateToTime(date.timeStart),
        timeEnd: databaseDateToTime(date.timeEnd),
        timeBreakStart: databaseDateToTime(date.timeBreakStart),
        timeBreakEnd: databaseDateToTime(date.timeBreakEnd)
      }))
    };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="ca làm việc"
      isUpdate={isUpdate}
      createApi={createShiftApi}
      updateApi={updateShiftApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputFormz id="name" label="Tên ca làm việc (*)" value={watch('name')} errors={errors} register={register} />
        <InputFormz id="code" label="Mã ca làm việc (*)" value={watch('code')} errors={errors} register={register} />
        <CalendarFormz id="dateStart" label="Ngày áp dụng (*)" value={watch('dateStart')} errors={errors} register={register} />
        <CalendarFormz id="dateEnd" label="Ngày kết thúc" value={watch('dateEnd')} errors={errors} register={register} />
        <MultiSelectFormz
          id="departments"
          label="Phòng ban áp dụng"
          options={departments}
          value={watch('departments')}
          errors={errors}
          onChange={(e) => setValue('departments', e.target.value)}
          filter
        />
        <Dates data={dates} setData={setDates} />
      </div>
    </FormDetail>
  );
};
