import { Dialog } from 'primereact/dialog';

export const Dialogz = (props) => {
  const { header = '', children, visible, setVisible = () => {} } = props;

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      {children}
    </Dialog>
  );
};
