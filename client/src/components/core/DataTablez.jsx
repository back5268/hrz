import { DataTable } from 'primereact/datatable';

export const DataTablez = (props) => {
  const { children, ...prop } = props;

  return (
    <DataTable
      value={[]}
      paginator
      className="p-datatable-gridlines"
      showGridlines
      rows={10}
      dataKey="id"
      filterDisplay="menu"
      emptyMessage="No customers found."
      {...prop}
    >
      {children}
    </DataTable>
  );
};
