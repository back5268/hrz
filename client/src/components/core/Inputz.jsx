import { InputText } from 'primereact/inputtext';

export const Inputz = (props) => {
  const { id, label = '', type = 'text', value = '', errors = {}, register = () => {}, ...prop } = props;

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="p-float-label w-full">
        <InputText type={type} id={id} value={value} invalid={Boolean(errors[id])} {...register(id)} className="w-full" {...prop} />
        <label htmlFor={id}>{label}</label>
      </span>
      {errors[id] && <small className="w-full text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export const Inputzz = ({ ...prop }) => {
  return (
    <div className="p-2 w-full md:w-6/12 lg:w-3/12">
      <Inputz {...prop} />
    </div>
  );
};

export const InputFormz = ({ ...prop }) => {
  return (
    <div className="p-2 w-full lg:w-6/12">
      <Inputz {...prop} />
    </div>
  );
};
