import { createJobPositionApi, detailJobPositionApi, updateJobPositionApi } from '@api';
import { FormDetail } from '@components/base';
import { Editorz, InputFormz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp, convertNumberToString } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { JobPositionValidation } from '@lib/validation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  name: '',
  code: '',
  minSalary: '',
  maxSalary: '',
  description: ''
};

export const DetailJobPosition = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailJobPositionApi, { _id }, 'job-positionz', isUpdate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(JobPositionValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (newData.minSalary > newData.maxSalary) return "Mức lương tối thiểu không thể lớn hơn mức lương tối đa!"
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="vị trí công việc"
      isUpdate={isUpdate}
      createApi={createJobPositionApi}
      updateApi={updateJobPositionApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputFormz id="name" label="Tên công việc (*)" value={watch('name')} errors={errors} register={register} />
        <InputFormz id="code" label="Mã công việc (*)" value={watch('code')} errors={errors} register={register} />
        <InputFormz
          type="number"
          id="minSalary"
          min={1}
          label="Mức lương tối thiểu (VNĐ) (*)"
          value={watch('minSalary')}
          errors={errors}
          register={register}
          helper={watch('minSalary') ? convertNumberToString(watch('minSalary')) : ""}
        />
        <InputFormz
          type="number"
          id="maxSalary"
          min={1}
          label="Mức lương tối đa (VNĐ) (*)"
          value={watch('maxSalary')}
          errors={errors}
          register={register}
          helper={watch('maxSalary') ? convertNumberToString(watch('maxSalary')) : ""}
        />
        <Editorz data={watch("description")} setData={e => setValue("description", e)} label="Mô tả công việc" />
      </div>
    </FormDetail>
  );
};
