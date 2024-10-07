import { Cardz } from '@components/core';
import React from 'react';

export const FormList = (props) => {
  const { title, children } = props;

  return (
    <Cardz>
      <h2 className="font-semibold uppercase leading-normal mb-2">{title}</h2>
      <hr />
      {children}
    </Cardz>
  );
};
