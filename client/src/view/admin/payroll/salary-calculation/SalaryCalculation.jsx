import { getListMonthInfoApi, calculateSalaryApi } from '@api';
import { Buttonz, CalendarFormz, Dialogz, DropdownFormz, MultiSelectFormz, ProgressSpinnerz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetApi } from '@lib/react-query';
import { SalaryCalculationValidation } from '@lib/validation';
import { useDataState, useToastState } from '@store';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { Accounts } from './Component';

const defaultValues = {
  month: String(moment().format('YYYYMM')),
  departments: [],
  accounts: []
};
export const SalaryCalculationz = (props) => {
  const { open, setOpen } = props;
  const { showToast } = useToastState();
  const [loading, setLoading] = useState(false);
  const { data: months } = useGetApi(getListMonthInfoApi, {}, 'months');
  const { departments, accounts } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(SalaryCalculationValidation),
    defaultValues
  });

  const onSubmit = async (value) => {
    const params = { ...value };
    setLoading(true);
    const res = await calculateSalaryApi(params);
    setLoading(false);
    if (res) {
      showToast({ title: 'Đã thêm vào tính toán công lương, chờ xử lý!', severity: 'success' });
      setOpen(false);
      reset();
    }
  };

  const setOpenz = () => {
    setOpen(false)
    reset()
  }

  return (
    <Dialogz className="w-[1200px]" header="Tính toáng công lương" open={open} setOpen={setOpenz}>
      <form onSubmit={handleSubmit(onSubmit)} className="border-t border-border">
        <div className="w-full max-h-[1000px] overflow-scroll">
          <div className="relative w-full mt-4">
            {loading && (
              <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
                <ProgressSpinnerz style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration="1s" />
              </div>
            )}
            <div className="flex flex-col justify-center items-center w-full">
              <DropdownFormz
                label="Tháng (*)"
                options={months}
                value={watch('month')}
                errors={errors}
                onChange={(e) => setValue('month', e.target.value)}
              />
              <CalendarFormz
                selectionMode="range"
                readOnlyInput
                id="dates"
                label="Khoảng thời gian tính (*)"
                value={watch('dates')}
                errors={errors}
                register={register}
              />
              <MultiSelectFormz
                label="Phòng ban áp dụng (*)"
                options={departments}
                value={watch('departments')}
                errors={errors}
                onChange={(e) => {
                  setValue('departments', e.target.value);
                  setValue('accounts', []);
                }}
                filter
              />
              <MultiSelectFormz
                label="Nhân viên áp dụng (*)"
                options={watch('departments') ? accounts?.filter((a) => watch('departments')?.includes(a.department)) : []}
                value={watch('accounts')}
                optionLabel="fullName"
                errors={errors}
                onChange={(e) => setValue('accounts', e.target.value)}
                filter
              />
              <Accounts data={accounts?.filter((a) => watch('accounts')?.includes(a._id))} setData={(e) => setValue('accounts', e)} />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz outlined color="red" label="Trờ lại" onClick={setOpenz} />
          <Buttonz label="Xác nhận" type="submit" />
        </div>
      </form>
    </Dialogz>
  );
};