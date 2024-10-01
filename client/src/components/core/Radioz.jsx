import { RadioButton } from "primereact/radiobutton";

export const Radioz = () => {
  return (
    <div className="field-radiobutton">
      <RadioButton
        inputId="option1"
        name="option"
        value="Chicago"
      />
      <label htmlFor="option1">Chicago</label>
    </div>
  );
};
