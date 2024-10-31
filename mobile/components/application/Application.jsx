import { createApplicationApi, detailApplicationApi, getListShiftApi } from '@/api';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Buttonz, DateTimePickerz, InputForm, Loadingz, SelectForm } from '../core';
import { useForm } from 'react-hook-form';
import { applicationTypes } from '../../constants';
import { FilePickerz } from '../core/FilePickerz';
import { useGetApi } from '@/lib/react-query';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ApplicationValidation } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';
import { databaseDate } from '@/lib/helper';
import moment from 'moment';

const showToast = (title, type = 'error') => {
  Toast.show({
    type: type,
    text2: title
  });
};

const defaultValues = {
  shift: '',
  type: '',
  reason: '',
  soon: '',
  late: '',
  fromTime: '',
  toTime: ''
};

export const Application = ({ _id }) => {
  const isUpdate = Boolean(_id);
  const router = useRouter();
  const { data: item } = useGetApi(detailApplicationApi, { _id }, 'applicationz', isUpdate);
  const { data: shifts } = useGetApi(getListShiftApi, {}, 'shifts');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ApplicationValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item?.dates?.length > 0) {
        const type = item.type;
        if ([1, 2, 4, 5, 6].includes(type)) setValue('date', new Date(item.dates[0]));
        else if ([3, 7].includes(type)) {
          setValue('fromDate', new Date(item.dates[0]));
          setValue('toDate', new Date(item.dates[item.dates.length - 1]));
        }
      }
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const type = watch('type');
  const handleOnchange = () => {
    setValue('date', '');
    setValue('fromDate', '');
    setValue('toDate', '');
    setValue('late', '');
    setValue('soon', '');
    setValue('fromTime', '');
    setValue('toTime', '');
  };

  const onSubmit = async (value) => {
    if (isUpdate) return router.back();
    const params = { shift: value.shift, type: value.type, reason: value.reason };
    if ([1, 2].includes(type)) {
      if (!value.date) return showToast('Ngày nghỉ không được bỏ trống!');
      else params.dates = [databaseDate(value.date, 'date')];
    }
    if ([3, 7].includes(type)) {
      if (!value.fromDate) return showToast('Ngày bắt đầu không được bỏ trống!');
      else if (!value.toDate) return showToast('Ngày kết thúc không được bỏ trống!');
      else if (new Date(value.fromDate) > new Date(value.toDate)) return showToast('Ngày bắt đầu không được lớn hơn ngày kết thúc!');
      const startDate = moment(value.fromDate);
      const endDate = moment(value.toDate);
      const duration = moment.duration(endDate.diff(startDate));
      const days = duration.asDays() + 1;
      const arr = new Array(days).fill(null);
      params.dates = [];
      arr.forEach((_a, index) => {
        const date = startDate.clone().add(index, 'days').format('YYYY-MM-DD');
        params.dates.push(date);
      });
    }
    if ([4].includes(type)) {
      if (!value.date) return showToast('Ngày xác nhận công không được bỏ trống!');
      else if (new Date(value.date) < new Date()) return showToast('Ngày xác nhận công không được nhỏ hơn ngày hiện tại!');
      else params.dates = [databaseDate(value.date, 'date')];
    }
    if ([5].includes(type)) {
      if (!value.date) return showToast('Ngày không được bỏ trống!');
      else if (new Date(value.date) < new Date()) return showToast('Ngày không được nhỏ hơn ngày hiện tại!');
      else if (!value.soon && !value.late) return showToast('Vui lòng chọn thời gian đi trễ hoặc thời gian về sớm!');
      else {
        params.dates = [databaseDate(value.date, 'date')];
        params.soon = databaseDate(value.soon, 'timez');
        params.late = databaseDate(value.late, 'timez');
      }
    }
    if ([6].includes(type)) {
      if (!value.date) return showToast('Ngày không được bỏ trống!');
      else if (new Date(value.date) < new Date()) return showToast('Ngày không được nhỏ hơn ngày hiện tại!');
      else if (!value.fromTime) return showToast('Thời gian bắt đầu không được bỏ trống!');
      else if (!value.toTime) return showToast('Thời gian kết thúc không được bỏ trống!');
      else {
        params.dates = [databaseDate(value.date, 'date')];
        params.fromTime = databaseDate(value.fromTime, 'timez');
        params.toTime = databaseDate(value.toTime, 'timez');
      }
    }

    if (files?.length > 0) params.formData = { files: files };
    setLoading(true);
    const response = await createApplicationApi(params);
    setLoading(false);
    if (response) {
      showToast('Thêm mới đơn thành công!', 'success');
      router.back();
    }
  };

  return (
    <>
      {loading && <Loadingz />}
      <SafeAreaView className="bg-primary h-full px-2">
        <ScrollView className="pb-16">
          <SelectForm label="Ca làm việc (*)" name="shift" options={shifts} errors={errors} control={control} />
          <SelectForm
            label="Loại đơn (*)"
            name="type"
            options={applicationTypes}
            errors={errors}
            control={control}
            handleOnchange={handleOnchange}
          />
          {[1, 2].includes(type) ? (
            <DateTimePickerz label="Ngày nghỉ (*)" value={watch('date')} setValue={(e) => setValue('date', e)} />
          ) : [3, 7].includes(type) ? (
            <>
              <DateTimePickerz label="Ngày bắt đầu (*)" value={watch('fromDate')} setValue={(e) => setValue('fromDate', e)} />
              <DateTimePickerz label="Ngày kết thúc (*)" value={watch('toDate')} setValue={(e) => setValue('toDate', e)} />
            </>
          ) : type === 4 ? (
            <DateTimePickerz label="Ngày xác nhận công (*)" value={watch('date')} setValue={(e) => setValue('date', e)} />
          ) : type === 5 ? (
            <>
              <DateTimePickerz label="Ngày" value={watch('date')} setValue={(e) => setValue('date', e)} />
              <DateTimePickerz label="Số thời gian đi trễ" value={watch('late')} setValue={(e) => setValue('late', e)} mode="timez" />
              <DateTimePickerz label="Số thời gian về sớm" value={watch('soon')} setValue={(e) => setValue('soon', e)} mode="timez" />
            </>
          ) : type === 6 ? (
            <>
              <DateTimePickerz label="Ngày" value={watch('date')} setValue={(e) => setValue('date', e)} />
              <DateTimePickerz label="Thời gian bắt đầu" value={watch('fromTime')} setValue={(e) => setValue('fromTime', e)} mode="timez" />
              <DateTimePickerz label="Thời gian kết thúc" value={watch('toTime')} setValue={(e) => setValue('toTime', e)} mode="timez" />
            </>
          ) : (
            <></>
          )}

          <InputForm label="Lý do tạo đơn (*)" name="reason" control={control} errors={errors} multiline numberOfLines={4} />
          <FilePickerz files={files} setFiles={setFiles} />
        </ScrollView>
        <View className="flex flex-row flex-wrap w-full my-2">
          <View className="w-6/12 px-1">
            <Buttonz label="Trở lại" mode="outlined" onPress={() => router.back()} />
          </View>
          <View className="w-6/12 px-1">
            <Buttonz label="Xác nhận" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
