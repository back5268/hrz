import { deletePositionApi, getListPositionApi, updatePositionApi } from '@api';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Columnz, Inputzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailPosition } from './Detail';

export const Positions = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListPositionApi, params, 'positions');

  return (
    <FormList title="Danh sách chức vụ">
      <DetailPosition open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-3/4">
        <Inputzz value={filter.email} onChange={(e) => setFilter({ ...filter, email: e.target.value })} label="Tìm kiếm theo tên" />
      </DataFilter>
      <hr />
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
          moreActions: [
            {
              icon: ArrowPathIcon,
              onClick: (item) => onResetPassword(item)
            }
          ]
        }}
        statusInfo={{ changeStatusApi: updatePositionApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      >
        <Columnz header="Tên chức vụ" />
        <Columnz header="Lương cơ bản" />
        <Columnz header="Mô tả" />
      </DataTable>
    </FormList>
  );
};
