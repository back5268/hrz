import { DataTable } from 'primereact/datatable';

export const Tablez = (props) => {
  const { children, ...prop } = props;

  return (
    <DataTable
      lazy
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      paginator
      rowHover
      showGridlines
      stripedRows
      scrollable
      selectionMode="checkbox"
      {...prop}
    >
      {children}
    </DataTable>
  );
};
