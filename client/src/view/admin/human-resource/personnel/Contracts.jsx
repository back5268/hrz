import { deleteDepartmentApi, getListDepartmentApi, updateDepartmentApi } from '@api';
import { DataTable, DataFilter, UserBody } from '@components/base';
import { Columnz, Dropdownzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailContract } from './DetailContract';
import { contractStatus, contractTypes } from '@constant';

export const Contracts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListDepartmentApi, params, 'department');

  return (
    <div>
      <DetailContract open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-2/4">
        <Dropdownzz
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          options={contractTypes}
          label="Loại hợp đồng"
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={contractStatus}
          label="Trạng thái"
        />
      </DataFilter>
      <DataTable
        title="Phòng ban"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteDepartmentApi
        }}
        statusInfo={{ changeStatusApi: updateDepartmentApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      >
        <Columnz header="Tên phòng ban" field="name" />
        <Columnz header="Mã phòng ban" field="code" />
        <Columnz header="Mô tả" field="description" />
        <Columnz header="Thời gian tạo" body={(e) => UserBody(e.createdAt, e.by)} />
        <Columnz header="Thời gian cập nhật" body={(e) => (e.updatedBy ? UserBody(e.updatedAt, e.updatedBy) : '')} />
      </DataTable>
    </div>
  );
};
