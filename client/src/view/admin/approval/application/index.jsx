import { getListApplicationApi } from '@api';
import { DataTable, FormList, DataFilter, UserBody, Body } from '@components/base';
import { Columnz, Dropdownzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailApplication } from './Detail';
import { useDataState } from '@store';
import { applicationStatus, applicationTypes } from '@constant';

export const Application = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListApplicationApi, params, 'application');
  const { departments, accounts } = useDataState();

  return (
    <FormList title="Danh sách đơn từ">
      <DetailApplication open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-full">
        <Dropdownzz
          value={filter.department}
          onChange={(e) => setFilter({ ...filter, department: e.target.value, account: undefined })}
          options={departments}
          label="Phòng ban"
          showClear
          filter
        />
        <Dropdownzz
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          options={filter.department ? accounts.filter((a) => a.department === filter.department) : accounts}
          optionLabel="fullName"
          label="Nhân viên"
          showClear
        />
        <Dropdownzz
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          options={applicationTypes}
          label="Loại đơn"
          showClear
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={applicationStatus}
          label="Trạng thái"
          showClear
        />
      </DataFilter>
      <DataTable
        title="đơn từ"
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
        <Columnz header="Phòng ban" body={(e) => Body(departments, e.department)} />
        <Columnz header="Nhân viên" body={(e) => Body(accounts, e.account, '_id', 'fullName')} />
        <Columnz header="Mã NV" body={(e) => Body(accounts, e.account, '_id', 'staffCode')} />
        <Columnz header="Loại đơn" body={(e) => Body(applicationTypes, e.type)} />
        <Columnz header="Lý do tạo đơn" field="reason" />
        <Columnz header="Thời gian duyệt" body={(e) => (e.updatedBy ? UserBody(e.updatedAt, e.updatedBy) : '')} />
        <Columnz header="Trạng thái" body={(e) => Body(applicationStatus, e.status)} />
        <Columnz header="File đính kèm" />
      </DataTable>
    </FormList>
  );
};