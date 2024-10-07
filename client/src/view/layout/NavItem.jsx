import { ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Ripple } from 'primereact/ripple';

export const NavItem = (props) => {
  const { item = {}, pathname = '', Icon } = props;
  const isSelected = item.route === '/' ? pathname === '/' : pathname.includes(item.route);

  const Fragment = ({ children }) => {
    const route = item.route;
    return <Link to={route}>{children}</Link>;
  };

  return (
    <Fragment>
      <div className={`p-3 rounded-sm p-ripple ${isSelected ? 'bg-primary text-white' : 'hover:bg-hover-sidebar'}`}>
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-5 w-5" /> : <ChevronRightIcon strokeWidth={4} className="h-4 w-5" />}
          <span>{item.label}</span>
        </div>
        <Ripple />
      </div>
    </Fragment>
  );
};
