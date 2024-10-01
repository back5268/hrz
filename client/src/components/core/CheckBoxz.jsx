import { Checkbox } from 'primereact/checkbox';
import React from 'react';

export const CheckBoxz = () => {
  return (
    <div className="field-checkbox">
      <Checkbox
        inputId="checkOption1"
        name="option"
        value="Chicago"
      />
      <label htmlFor="checkOption1">Chicago</label>
    </div>
  );
};
