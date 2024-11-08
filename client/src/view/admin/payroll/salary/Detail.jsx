import { Buttonz, Columnz, Dialogz, Tablez } from '@components/core';
import { formatNumber } from '@lib/helper';
import React from 'react';

const Text = ({ label, value }) => {
  return (
    <span>
      {label}: <b>{value}</b>
    </span>
  );
};

export const Detail = (props) => {
  const { open, setOpen, data, accounts } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const account = accounts?.find((a) => a._id === item?.account);
  const mandatories = [
    { name: 'Bảo hiểm xã hội', value: item?.mandatory?.bhxh?.value, summary: item?.mandatory?.bhxh?.summary },
    { name: 'Bảo hiểm y tế', value: item?.mandatory?.bhyt?.value, summary: item?.mandatory?.bhyt?.summary },
    { name: 'Bảo hiểm thất nghiệp', value: item?.mandatory?.bhtn?.value, summary: item?.mandatory?.bhtn?.summary },
    { name: 'Phí công đoàn', value: item?.mandatory?.unionDues?.value, summary: item?.mandatory?.unionDues?.summary }
  ];

  return (
    <Dialogz
      className="w-[1200px]"
      header={`Chi tiết phiếu lương tháng ${item?.month} - Nhân viên: ${account?.fullName}/${account?.staffCode}`}
      open={open}
      setOpen={setOpen}
    >
      <form className="border-t border-border">
        <div className="w-full h-bodyModal overflow-scroll text-secondary">
          <div className="relative w-full mt-4 px-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <div className="w-7/12 flex flex-col gap-2">
                  <span>
                    Lương thực nhận: <b className='text-xl text-red-500'>{formatNumber(item?.summary)}</b>
                  </span>
                  <Text label="Lương theo hợp đồng lao động" value={formatNumber(item?.baseSalary) + ' VNĐ'} />
                  <Text label="Số ngày đi làm chấm công" value={item?.numberDay} />
                  <Text
                    label={`Số công chính thức ${item?.nomalWork?.number}/${item?.nomalWork?.total}`}
                    value={formatNumber(item?.nomalWork?.summary) + ' VNĐ'}
                  />
                  <Text
                    label={`Số công làm thêm giờ ${item?.otWork?.number}/${item?.otWork?.total}`}
                    value={formatNumber(item?.otWork?.summary) + ' VNĐ'}
                  />
                  <Text label="Phạt đi muộn / về sớm" value={formatNumber(item?.soonLates?.reduce((a, b) => a + b.summary, 0)) + ' VNĐ'} />
                </div>
              </div>
              <hr />
              <div className="w-full mt-4 flex justify-between">
                <label className="inline-block font-medium text-left">Các khoản trợ cấp / Phụ cấp</label>
                <label className="inline-block font-medium text-left">{formatNumber(item?.allowanceAmount) + ' VNĐ'}</label>
              </div>
              <hr />
              <Tablez
                value={item?.allowances || []}
                rows={100}
                dataKey="name"
                paginatorTemplate=""
                rowsPerPageOptions={[100]}
                params={{ page: 1, limit: 100 }}
              >
                <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
                <Columnz header="Tiêu đề" field="name" />
                <Columnz
                  header="Giá trị"
                  body={(e) => (
                    <span className="text-nowrap text-start flex justify-start">
                      <b>{formatNumber(e.value)} VNĐ</b> {e.type === 1 ? '(Theo tháng)' : '(Theo ngày làm việc)'}
                    </span>
                  )}
                />
                <Columnz header="Tổng" body={(e) => formatNumber(e.summary) + ' VNĐ'} />
              </Tablez>

              <div className="w-full mt-4 flex justify-between">
                <label className="inline-block font-medium text-left">Các khoản thưởng</label>
                <label className="inline-block font-medium text-left">
                  {formatNumber(item?.bonuses?.reduce((a, b) => a + b.summary, 0)) + ' VNĐ'}
                </label>
              </div>
              <hr />
              <Tablez
                value={item?.bonuses || []}
                rows={100}
                dataKey="name"
                paginatorTemplate=""
                rowsPerPageOptions={[100]}
                params={{ page: 1, limit: 100 }}
              >
                <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
                <Columnz header="Tiêu đề" field="name" />
                <Columnz header="Tổng" body={(e) => formatNumber(e.summary) + ' VNĐ'} />
              </Tablez>

              <div className="w-full mt-4 flex justify-between">
                <label className="inline-block font-medium text-left">Các khoản giảm trừ bắt buộc</label>
                <label className="inline-block font-medium text-left">{formatNumber(item?.mandatoryAmount) + ' VNĐ'}</label>
              </div>
              <hr />
              <Tablez
                value={mandatories}
                rows={100}
                dataKey="name"
                paginatorTemplate=""
                rowsPerPageOptions={[100]}
                params={{ page: 1, limit: 100 }}
              >
                <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
                <Columnz header="Tiêu đề" field="name" />
                <Columnz header="Giá trị" body={(e) => <b>{e.value} %</b>} />
                <Columnz header="Tổng" body={(e) => formatNumber(e.summary) + ' VNĐ'} />
              </Tablez>
            </div>
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
