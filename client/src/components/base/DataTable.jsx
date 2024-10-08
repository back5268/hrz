import React, { useEffect, useState } from 'react';
import { TrashIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useToastState } from '@store';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeSpecialCharacter } from '@lib/helper';
import { Buttonz, Columnz, SplitButtonz, Switchz, Tablez } from '@components/core';
import { confirmDialog } from 'primereact/confirmdialog';

export const DataTable = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    title,
    data = [],
    total = 0,
    loading = false,
    key = '_id',
    params = { page: 1, limit: 10 },
    setParams = () => {},
    actionsInfo = {},
    headerInfo = {},
    statusInfo = {},
    baseActions = [],
    rows = [10, 20, 50, 100, 200, 500],
    select,
    setSelect,
    onSuccess = () => {},
    hideParams
  } = props;
  const {
    onViewDetail = () => {},
    onDelete,
    deleteApi = () => {},
    handleDelete = (item) => ({ _id: item._id }),
    moreActions
  } = actionsInfo;
  const { onCreate = () => {}, onImport = () => {}, exportApi, moreHeader, items } = headerInfo;
  const { changeStatusApi = () => {}, handleChangeStatus = (item) => ({ _id: item._id, status: item.status ? 0 : 1 }) } = statusInfo;
  const isActions = baseActions.includes('detail') || baseActions.includes('delete') || Boolean(moreActions);
  const isHeader =
    baseActions.includes('create') || baseActions.includes('import') || baseActions.includes('export') || moreHeader || items;
  const isStatus = Boolean(statusInfo.changeStatusApi);

  const onDeletez = (item) => {
    confirmDialog({
      message: 'Bạn có chắc chắn muốn xóa dữ liệu này!',
      header: "HRZ",
      icon: 'pi pi-info-circle',
      accept: async () => {
        const response = await deleteApi(handleDelete(item));
        if (response) showToast({ title: 'Xóa dữ liệu thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const onExport = async () => {
    setIsLoading(true);
    const response = await exportApi({ ...params, page: undefined, limit: undefined });
    setIsLoading(false);
    if (response) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(response);
      downloadLink.download = (title && `ket-qua-export-${removeSpecialCharacter(title)}.xlsx`) || 'data.xlsx';
      downloadLink.click();
      showToast({ title: `Export ${title} thành công!`, severity: 'success' });
    }
  };

  const onChangeStatus = (item) => {
    confirmDialog({
      message: 'Bạn có chắc chắn muốn chuyển trạng thái dữ liệu này!',
      header: "HRZ",
      icon: 'pi pi-info-circle',
      accept: async () => {
        const response = await changeStatusApi(handleChangeStatus(item));
        if (response) showToast({ title: 'Chuyển trạng thái thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const handleSelect = (callback = () => {}) => {
    if (!(select?.length > 0)) return showToast({ title: `Vui lòng chọn ${title || 'dữ liệu'}!`, severity: 'warning' });
    callback();
  };

  useEffect(() => {
    if (hideParams) return;
    const query = {};
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (!['render'].includes(key) && !['', undefined, null].includes(value)) query[key] = value;
      }
    }
    navigate(location.pathname + '?' + new URLSearchParams(query).toString());
  }, [JSON.stringify(params)]);

  const onPage = (event) => {
    setParams({
      ...params,
      limit: event.rows,
      page: event.page !== 0 ? event.page + 1 : 1
    });
  };

  const Header = () => (
    <div className="flex gap-2 justify-start mb-1">
      {baseActions.includes('create') && <Buttonz onClick={onCreate}>Thêm mới</Buttonz>}
      {baseActions.includes('import') && (
        <Buttonz color="green" onClick={onImport}>
          Import
        </Buttonz>
      )}
      {baseActions.includes('export') && (
        <Buttonz color="green" onClick={onExport} loading={isLoading}>
          Export
        </Buttonz>
      )}
      {items?.length > 0 && <SplitButtonz items={items.map((item) => ({ ...item, onClick: () => handleSelect(item.onClick) }))} />}
      {moreHeader?.length > 0 &&
        moreHeader.map((header, index) => {
          const color = header.color || 'cyan';

          return (
            <Buttonz key={index} color={color} onClick={() => header.onClick()}>
              {header.children() || ''}
            </Buttonz>
          );
        })}
    </div>
  );

  return (
    <Tablez
      header={isHeader && Header}
      params={params}
      rows={params.limit}
      value={data}
      totalRecords={total}
      rowsPerPageOptions={rows}
      onPage={onPage}
      dataKey={key}
      loading={loading}
      emptyMessage={'Không tìm thấy ' + title?.toLowerCase() || ''}
      selection={select}
      onSelectionChange={(e) => {
        if (setSelect) setSelect(e.value);
      }}
    >
      {select && setSelect && <Columnz selectionMode="multiple" />}
      <Columnz header="#" frozen body={(data, options) => options.rowIndex + 1} />
      {props.children}
      {isStatus && (
        <Columnz
          headerStyle={{ padding: 'auto', textAlign: 'center' }}
          header="Trạng thái"
          body={(item) => (
            <div className="flex justify-center items-center">
              <Switchz checked={Boolean(item.status)} onChange={() => onChangeStatus(item)} />
            </div>
          )}
        />
      )}
      {isActions && (
        <Columnz
          header="Thao tác"
          body={(item) => (
            <div className="flex justify-center items-center gap-2">
              {baseActions.includes('detail') && (
                <Buttonz
                  onClick={() => onViewDetail(item)}
                  outlined
                  className="!p-0 h-10 w-10 flex justify-center items-center rounded-full"
                  icon={<DocumentMagnifyingGlassIcon className="w-6" />}
                />
              )}
              {baseActions.includes('delete') && (
                <Buttonz
                  severity="danger"
                  outlined
                  onClick={() => (onDelete ? onDelete(item) : onDeletez(item))}
                  className="!p-0 h-10 w-10 flex justify-center items-center rounded-full"
                  icon={<TrashIcon className="w-5" />}
                />
              )}
              {moreActions?.length > 0 &&
                moreActions.map((action, index) => {
                  const color = action.color || 'cyan';
                  const variant = action.variant || 'outlined';
                  const Icon = action.icon;
                  const isHide = action.isHide && action.isHide(item);

                  return (
                    !isHide && (
                      <Buttonz
                        key={index}
                        color={color}
                        onClick={() => action.onClick(item)}
                        variant={variant}
                        className="rounded-full !p-0"
                      >
                        <Icon className="w-5" />
                      </Buttonz>
                    )
                  );
                })}
            </div>
          )}
        />
      )}
    </Tablez>
  );
};
