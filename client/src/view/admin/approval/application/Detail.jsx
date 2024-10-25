import React from 'react';
import { FormDetail } from '@components/base';
import { InputFormz, TextAreaz } from '@components/core';

export const DetailApplication = (props) => {
  const { open, setOpen, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  return (
    <FormDetail
      title="đơn từ"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
    >
      <div className="flex flex-wrap w-full">
      </div>
    </FormDetail>
  );
};
