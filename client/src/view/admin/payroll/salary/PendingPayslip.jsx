import {
  deletePendingPayslipApi,
  getListMonthInfoApi,
  getListPendingPayslipApi,
  previewPendingPayslipApi,
  updateStatusPendingPayslipApi
} from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Columnz, Dropdownzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { Detail } from './Detail';
import { useDataState } from '@store';
import { formatDate, formatNumber } from '@lib/helper';
import { PrinterIcon } from '@heroicons/react/24/outline';

export const PendingPayslip = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState([]);
  const { isLoading, data } = useGetApi(getListPendingPayslipApi, params, 'pending-payslip');
  const { data: months } = useGetApi(getListMonthInfoApi, params, 'months');
  const { departments, accounts } = useDataState();
  const [loading, setLoading] = useState(false);

  const onUpdate = async (status) => {
    setLoading(true);
    const response = await updateStatusPendingPayslipApi({ _ids: select, status });
    setLoading(false);
    if (response) {
      showToast({ title: 'Duyệt phiếu lương thành công', severity: 'success' });
      setParams((pre) => ({ ...pre, render: !pre.render }));
      setSelect([]);
    }
  };

  const onPreviewPayslip = async (item) => {
    const response = await previewPendingPayslipApi({ _id: item._id });
    if (response) {
      window.open(`/print/${item._id}`, '_blank');
    }
  };

  return (
    <FormList title="Danh sách phiếu lương chờ duyệt">
      <Detail open={open} setOpen={setOpen} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-1/4">
        <Dropdownzz
          value={filter.department}
          onChange={(e) => setFilter({ ...filter, department: e.target.value, account: undefined })}
          options={departments}
          label="Phòng ban"
          filter
        />
        <Dropdownzz
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          options={filter.department ? accounts.filter((a) => a.department === filter.department) : accounts}
          optionLabel="fullName"
          label="Nhân viên"
          filter
          showClear
        />
        <Dropdownzz
          value={filter.month}
          onChange={(e) => setFilter({ ...filter, month: e.target.value })}
          options={months}
          label="Tháng"
          filter
          showClear
        />
      </DataFilter>
      <DataTable
        title="phiếu lương chờ duyệt"
        loading={isLoading || loading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        select={select}
        setSelect={setSelect}
        baseActions={['detail', 'delete']}
        setShow={setOpen}
        headerInfo={{ items: [{ label: 'Duyệt bảng lương', onClick: () => onUpdate(2) }] }}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deletePendingPayslipApi,
          moreActions: [
            {
              icon: PrinterIcon,
              onClick: (item) => onPreviewPayslip(item)
            }
          ]
        }}
      >
        <Columnz
          header="Nhân viên"
          body={(e) => {
            const department = departments?.find((d) => d._id === e.department) || {};
            const account = accounts?.find((a) => a._id === e.account) || {};
            return (
              <div className="flex flex-col gap-2">
                <span>Phòng ban: {department?.name}</span>
                <span>
                  {account?.fullName} - {account?.staffCode}
                </span>
              </div>
            );
          }}
        />
        <Columnz header="Tháng" field="month" />
        <Columnz
          header="Thời gian tính"
          body={(e) => (
            <div className="flex flex-col gap-2">
              <span>{formatDate(e.from, 'date')}</span>
              <span>{formatDate(e.to, 'date')}</span>
            </div>
          )}
        />
        <Columnz header="Lương theo ngày chấm công" body={(e) => formatNumber(e.nomalWork?.summary + e.otWork?.summary)} />
        <Columnz header="Trợ cấp/ Phụ cấp" body={(e) => formatNumber(e.allowances?.reduce((a, b) => a + b.summary, 0))} />
        <Columnz header="Thưởng" body={(e) => formatNumber(e.bonuses?.reduce((a, b) => a + b.summary, 0))} />
        <Columnz header="Các khoản trừ" body={(e) => formatNumber(e.soonLates?.reduce((a, b) => a + b.summary, 0) + e.mandatoryAmount)} />
        <Columnz header="Tổng" body={(e) => formatNumber(e.summary)} />
      </DataTable>
    </FormList>
  );
};
