import { Dropdown } from 'primereact/dropdown';

const Dropdownz = (props) => {
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

export const Dropdownzz = ({ ...prop }) => {
  return (
    <div className="p-2 w-full md:w-6/12 lg:w-3/12">
      <Dropdownz {...prop} />
    </div>
  );
};

export const DropdownFormz = ({ ...prop }) => {
  return (
    <div className="p-2 w-full lg:w-6/12">
      <Dropdownz {...prop} />
    </div>
  );
};
