import { Button } from 'primereact/button';

export const Buttonz = (props) => {
  const { type = "button", label = "", className = "", ...prop } = props;
  return <Button raised type={type} label={label} className={`flex justify-center rounded-sm text-sm min-h-11 px-6 ${className}`} {...prop} />;
};
