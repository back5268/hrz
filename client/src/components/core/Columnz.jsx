import { Column } from 'primereact/column';

export const Columnz = (props) => {
  const { ...prop } = props;
  return <Column {...prop} />;
};
