import { createNotifyApi, detailNotifyApi, updateNotifyApi } from '@api';
import { FormDetail, UploadFiles } from '@components/base';
import { Editorz, InputFormz, MultiSelectFormz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp, handleFiles } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { NotifyValidation } from '@lib/validation';
import { useDataState } from '@store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  subject: '',
  departments: [],
};

export const DetailNotifyz = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailNotifyApi, { _id }, 'notifyz', isUpdate);
  const { departments } = useDataState();
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(NotifyValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.files) setFiles(item.files);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let params = { ...data };
    params = handleFiles(item, params, files, 'files');
    if (isUpdate) return { ...checkEqualProp(params, item), _id };
    else return params;
  };

  return (
    <FormDetail
      type="nomal"
      title="Thông báo"
      isUpdate={isUpdate}
      createApi={createNotifyApi}
      updateApi={updateNotifyApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputFormz id="subject" label="Tiêu đề (*)" value={watch('subject')} errors={errors} register={register} />
        <MultiSelectFormz
          id="departments"
          label="Phòng ban hiển thị"
          options={departments}
          value={watch('departments')}
          errors={errors}
          onChange={(e) => setValue('departments', e.target.value)}
          filter
        />
        <UploadFiles max={5} label="File đính kèm" files={files} setFiles={setFiles} />
        <Editorz data={watch('content')} setData={(e) => setValue('content', e)} label="Nội dung thông báo" />
      </div>
    </FormDetail>
  );
};
