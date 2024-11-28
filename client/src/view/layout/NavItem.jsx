import { ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';

export const NavItem = (props) => {
  const { item = {}, pathname = '', Icon } = props;
  const isSelected =
    '/timekeeping-config' === pathname || '/' === pathname || '/approved-payslip' === pathname
      ? pathname === item.route
      : item.route !== '/' && pathname.includes(item.route);

  const Fragment = ({ children }) => {
    const route = item.route;
    return <Link to={route}>{children}</Link>;
  };

  return (
    <Fragment>
      <div className={`p-3 rounded-md ${isSelected ? 'text-primary font-semibold' : 'hover:text-primary hover:font-semibold'}`}>
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-5 w-5" /> : <ChevronRightIcon strokeWidth={4} className="h-4 w-5" />}
          <span>{item.name}</span>
        </div>
      </div>
    </Fragment>
  );
};
