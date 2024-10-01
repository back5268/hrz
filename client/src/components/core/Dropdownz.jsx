import { Dropdown } from 'primereact/dropdown';

export const Dropdownz = (props) => {
  const {
    id,
    label = '',
    value = null,
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
        <Dropdown
          id={id}
          value={value}
          options={options}
          optionLabel={optionLabel}
          optionValue={optionValue}
          invalid={Boolean(errors[id])}
          className="w-full"
          {...register(id)}
          {...prop}
        ></Dropdown>
        <label htmlFor={id}>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
