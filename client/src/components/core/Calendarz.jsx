import { Calendar } from 'primereact/calendar';

export const Calendarz = (props) => {
  const { id, label = '', value = null, errors = {}, register = () => {}, ...prop } = props;

  return (
    <div className="flex flex-column gap-2">
      <span className="p-float-label w-full">
        <Calendar id={id} value={value} invalid={Boolean(errors[id])} {...register(id)} className="w-full" {...prop}></Calendar>
        <label htmlFor={id}>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
