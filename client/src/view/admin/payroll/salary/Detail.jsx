import { Buttonz, Dialogz } from '@components/core';
import React from 'react';

export const Detail = (props) => {
  const { open, setOpen, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  return (
    <Dialogz className="w-[1200px]" header="Chi tiết lịch sử tính công lương" open={open} setOpen={setOpen}>
      <form className="border-t border-border">
        <div className="w-full max-h-[1000px] overflow-scroll">
          <div className="relative w-full mt-4"></div>
        </div>
        <hr className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz outlined color="red" label="Trờ lại" onClick={() => setOpen(false)} />
          <Buttonz label="Xác nhận" type="submit" onClick={() => setOpen(false)} />
        </div>
      </form>
    </Dialogz>
  );
};
