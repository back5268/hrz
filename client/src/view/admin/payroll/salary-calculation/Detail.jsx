import { Body } from '@components/base';
import { Buttonz, Columnz, Dialogz, Tablez } from '@components/core';
import { formatDate, formatNumber } from '@lib/helper';
import { useDataState } from '@store';
import React from 'react';

export const Detail = (props) => {
  const { open, setOpen, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const { accounts } = useDataState();

  return (
    <Dialogz className="w-[1200px]" header={`Chi tiết ${item?.title?.toLowerCase()}`} open={open} setOpen={setOpen}>
      <form className="border-t border-border">
        <div className="w-full max-h-[1000px] overflow-scroll">
          <div className="relative w-full mt-4">
            <Tablez
              value={item?.detail}
              totalRecords={item?.detail?.length || 0}
              rows={100}
              rowsPerPageOptions={[100]}
              params={{ page: 1, limit: 100 }}
              dataKey="_id"
              emptyMessage="."
              paginatorTemplate="CurrentPageReport"
            >
              <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
              <Columnz header="Tên nhân viên" body={(e) => Body(accounts, e.account, '_id', 'fullName')} />
              <Columnz header="Mã nhân viên" body={(e) => Body(accounts, e.account, '_id', 'staffCode')} />
              <Columnz header="Ngày vào" body={(e) => formatDate(Body(accounts, e.account, '_id', 'dateIn'), 'date')} />
              <Columnz header="Lương cơ bản" body={(e) => formatNumber(Body(accounts, e.account, '_id', 'salary'))} />
              <Columnz
                header="Trạng thái"
                body={(e) =>
                  e.status === 0 ? (
                    <div className="flex items-center justify-center gap-4 font-medium bg-red-600 px-2 py-1 rounded-md text-white uppercase text-xs">
                      Có lỗi
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4 font-medium bg-green-600 px-2 py-1 rounded-md text-white uppercase text-xs">
                      Thành công
                    </div>
                  )
                }
              />
              <Columnz header="Thông báo" field="mess" />
            </Tablez>
          </div>
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
