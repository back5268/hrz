import {
  deletePersonnelApi,
  getListDepartmentInfoApi,
  getListJobPositionInfoApi,
  getListPersonnelApi,
  getListPositionInfoApi,
  updatePersonnelApi
} from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Columnz, Dropdownzz, Inputzz } from '@components/core';
import { status } from '@constant';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export * from './Detail';

export const Personnel = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListPersonnelApi, params, 'personnel');
  const { data: positions } = useGetApi(getListPositionInfoApi, {}, 'positions');
  const { data: jobPositions } = useGetApi(getListJobPositionInfoApi, {}, 'jobPositions');
  const { data: departments } = useGetApi(getListDepartmentInfoApi, {}, 'departments');

  return (
    <FormList title="Danh sách nhân viên">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputzz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã nhân viên"
        />
        <Inputzz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo số điện thoại, email"
        />
        <Dropdownzz
          value={filter.department}
          onChange={(e) => setFilter({ ...filter, department: e.target.value })}
          options={departments}
          label="Phòng ban"
          showClear
          filter
        />
        <Dropdownzz
          value={filter.position}
          onChange={(e) => setFilter({ ...filter, position: e.target.value })}
          options={positions}
          label="Chức vụ"
          showClear
          filter
        />
        <Dropdownzz
          value={filter.jobPosition}
          onChange={(e) => setFilter({ ...filter, jobPosition: e.target.value })}
          options={jobPositions}
          label="Vị trí công việc"
          showClear
          filter
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={status}
          label="Trạng thái"
          showClear
        />
      </DataFilter>
      <DataTable
        title="Nhân viên"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        actionsInfo={{
          onViewDetail: (item) => navigate(`/personnel/detail/${item._id}`),
          deleteApi: deletePersonnelApi
        }}
        statusInfo={{ changeStatusApi: updatePersonnelApi }}
        headerInfo={{
          onCreate: () => {
            navigate('/personnel/create');
          }
        }}
      >
        <Columnz header="Tên nhân viên" field="fullName" />
        <Columnz header="Mã nhân viên" field="staffCode" />
        <Columnz header="Email" field="email" />
        <Columnz header="Số điện thoại" field="phone" />
      </DataTable>
    </FormList>
  );
};
