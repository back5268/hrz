import { deletePositionApi, getListPositionApi, updatePositionApi } from '@api';
import { DataTable, FormList, DataFilter, UserBody } from '@components/base';
import { Columnz, Inputzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailPosition } from './Detail';

export const Position = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListPositionApi, params, 'position');

  return (
    <FormList title="Danh sách chức vụ">
      <DetailPosition open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-3/4">
        <Inputzz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Tìm kiếm theo tên, mã" />
      </DataFilter>
      <DataTable
        title="Chức vụ"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deletePositionApi,
        }}
        statusInfo={{ changeStatusApi: updatePositionApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      >
        <Columnz header="Tên chức vụ" field="name" />
        <Columnz header="Mã chức vụ" field="code" />
        <Columnz header="Mô tả" field="description" />
        <Columnz header="Thời gian tạo" body={e => UserBody(e.createdAt, e.by)} />
        <Columnz header="Thời gian cập nhật" body={e => e.updatedBy ? UserBody(e.updatedAt, e.updatedBy) : ""} />
      </DataTable>
    </FormList>
  );
};
