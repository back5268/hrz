import { MultiSelect } from 'primereact/multiselect';

export const MultiSelectz = (props) => {
  const {
    id,
    label = '',
    value = [],
    options = [],
    optionLabel = 'name',
    optionValue = '_id',
    errors = {},
    register = () => {},
    ...prop
  } = props;

  return (
    <div className="flex flex-column gap-2">
      <span className="p-float-label w-full">
        <MultiSelect
          id={id}
          value={value}
          options={options}
          optionLabel={optionLabel}
          optionValue={optionValue}
          invalid={Boolean(errors[id])}
          filter
          display="chip"
          className="w-full"
          {...register(id)}
          {...prop}
        />
        <label htmlFor={id}>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};