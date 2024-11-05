import { useState } from 'react';
import { SalaryCalculationz } from './SalaryCalculation';
import { SalarySetup } from './SalarySetup';
import { TaxSetup } from './TaxSetup';
import { Buttonz, Calendarzz, Cardz, Columnz, Dropdownzz, ProgressSpinnerz } from '@components/core';
import { useGetParams } from '@hooks';
import { getListSalaryLogApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { DataFilter, DataTable, TimeBody } from '@components/base';
import { salaryLogStatus } from '@constant';
import { Detail } from './Detail';

const handleParams = (params) => {
  if (Array.isArray(params.dates) && params.dates.length > 0) {
    params.fromDate = databaseDate(params.dates[0]);
    params.toDate = params.dates[1] ? databaseDate(params.dates[1], undefined, true) : databaseDate(params.dates[0], undefined, true);
  }
  return { ...params, dates: undefined };
};
export const SalaryCalculation = () => {
  const initParams = useGetParams();
  const [open, setOpen] = useState(false);
  const [taxOpen, setTaxOpen] = useState(false);
  const [salaryOpen, setSalaryOpen] = useState(false);
  const [calculationOpen, setCalculationOpen] = useState(false);
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListSalaryLogApi, handleParams(params), 'salary-log');

  return (
    <Cardz>
      <Detail open={open} setOpen={setOpen} />
      <SalarySetup open={salaryOpen} setOpen={setSalaryOpen} />
      <TaxSetup open={taxOpen} setOpen={setTaxOpen} />
      <SalaryCalculationz open={calculationOpen} setOpen={setCalculationOpen} />

      <div className="w-full flex gap-4 p-2 mb-2">
        <Buttonz label="Thiết lập công thức tính lương" onClick={() => setSalaryOpen(true)} />
        <Buttonz label="Thiết lập công thức tính thuế" onClick={() => setTaxOpen(true)} />
        <Buttonz label="Tính toán công lương" onClick={() => setCalculationOpen(true)} />
      </div>
      <hr className='mx-2' />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-1/4">
        <Calendarzz
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
          label="Khoảng thời gian (*)"
          value={filter.dates}
          onChange={(e) => setFilter({ ...filter, dates: e.value })}
          className="lg:w-6/12"
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={salaryLogStatus}
          label="Trạng thái"
          showClear
          filter
        />
      </DataFilter>
      <DataTable
        title="lịch sử tính lương"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['detail']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
      >
        <Columnz header="Tiêu đề" field="name" />
        <Columnz header="Tháng" field="month" />
        <Columnz header="Ngày bắt đầu" body={(e) => TimeBody(e.from, 'date')} />
        <Columnz header="Ngày kết thúc" body={(e) => TimeBody(e.to, 'date')} />
        <Columnz header="Thời gian tính" body={(e) => (e.by ? UserBody(e.createdAt, e.by) : '')} />
        <Columnz
          header="Trạng thái"
          body={(e) =>
            e.status === 0 ? (
              <div className="flex items-center justify-center gap-4 font-medium bg-amber-300 p-2 rounded-lg text-white uppercase text-xs">
                <ProgressSpinnerz style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration="1s" />
                <span>Đang xử lý</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 font-medium bg-green-300 p-2 rounded-lg text-white uppercase text-xs">
                Đã xử lý
              </div>
            )
          }
        />
      </DataTable>
    </Cardz>
  );
};
