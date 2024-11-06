import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavItem } from './NavItem';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const NavGroup = (props) => {
  const { value, item = {}, open, setOpen, pathname, Icon } = props;
  const nodeRef = useRef(null);
  const isOpen = open?.includes(value);

  return (
    <div className='border-b border-border'>
      <button
        onClick={() =>
          setOpen((pre) => {
            if (pre.includes(value)) return pre.filter((p) => p !== value);
            else return [...pre, value];
          })
        }
        className="flex items-center justify-between w-full p-3 rounded-sm"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          <span>{item.name}</span>
        </div>
        <ChevronDownIcon strokeWidth={2.5} className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <CSSTransition timeout={{ enter: 500, exit: 200 }} in={isOpen} classNames="menu-transition" unmountOnExit nodeRef={nodeRef}>
        <ul ref={nodeRef} className="pl-4">
          {item.items?.filter(item => item.showSidebar)?.map((item, index) => (
            <NavItem item={item} key={index} pathname={pathname} />
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};
