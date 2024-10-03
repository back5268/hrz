import React from 'react';
import { Ripple } from 'primereact/ripple';

export const NavItem = (props) => {
  const { value, item = {}, open, setOpen, pathname, Icon } = props;
  const isOpen = value === open;

  return (
    <li className='w-full'>
      <Ripple></Ripple>
    </li>
  );
};
