import { TemplateValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { updateTemplateApi } from '@api';
import { DropdownFormz, Editorz, InputFormz, TextAreaz } from '@components/core';
import { templateTypes } from '@constant';

const defaultValues = {
  type: '',
  description: '',
  subject: '',
  content: ''
};

export const DetailTemplate = (props) => {
  const { open, setOpen, setParams, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(TemplateValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="mẫu thông báo"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
      isUpdate={isUpdate}
      handleData={handleData}
      handleSubmit={handleSubmit}
      updateApi={updateTemplateApi}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <DropdownFormz
          id="type"
          label="Loại mẫu thông báo (*)"
          options={templateTypes}
          value={watch('type')}
          errors={errors}
          onChange={(e) => setValue('type', e.target.value)}
          disabled
        />
        <InputFormz id="subject" label="Tiêu đề (*)" value={watch('subject')} errors={errors} register={register} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} errors={errors} register={register} />
        <Editorz data={watch('content')} setData={(e) => setValue('content', e)} label="Nội dung" />
      </div>
    </FormDetail>
  );
};
