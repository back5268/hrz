import { getListTemplateApi } from '@api';
import { DataTable, FormList, DataFilter, UserBody, Body } from '@components/base';
import { Columnz, Dropdownzz, Inputzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailTemplate } from './Detail';
import { templateTypes } from '@constant';

export const Template = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListTemplateApi, params, 'template');

  return (
    <FormList title="Danh sách mẫu thông báo">
      <DetailTemplate open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputzz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Tìm kiếm theo tiêu đề" />
        <Dropdownzz
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          options={templateTypes}
          label="Loại mẫu thông báo"
          showClear
          filter
        />
      </DataFilter>
      <DataTable
        title="mẫu thông báo"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['detail']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
        }}
      >
        <Columnz header="Loại mẫu thông báo" body={e => Body(templateTypes, e.type)} />
        <Columnz header="Tiêu đề" field="subject" />
        <Columnz header="Mô tả" field="description" />
        <Columnz header="Thời gian cập nhật" body={e => e.updatedBy ? UserBody(e.updatedAt, e.updatedBy) : ""} />
      </DataTable>
    </FormList>
  );
};
