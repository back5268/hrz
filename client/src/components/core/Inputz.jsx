import { InputText } from 'primereact/inputtext';

export const Inputz = (props) => {
  const { id, label = '', type = 'text', value = '', errors = {}, register = () => {}, ...prop } = props;

  return (
    <div className="flex flex-column gap-2">
      <span className="p-float-label w-full">
        <InputText type={type} id={id} value={value} invalid={Boolean(errors[id])} {...register(id)} className='w-full' {...prop} />
        <label htmlFor={id}>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
