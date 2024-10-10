import { Logo } from '@components/base';
import { Buttonz } from '@components/core';
import { useEffect, useState } from 'react';
import { tools } from '@lib/tools';
import { Squares2X2Icon, UsersIcon, CircleStackIcon, Square3Stack3DIcon, InboxStackIcon } from '@heroicons/react/24/outline';
import { NavItem } from './NavItem';
import { NavGroup } from './NavGroup';
import { useLocation } from 'react-router-dom';

const icons = {
  Squares2X2Icon,
  UsersIcon,
  CircleStackIcon,
  Square3Stack3DIcon,
  InboxStackIcon
};

export const SideBar = (props) => {
  const { showSidebar, onSignOut } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState([]);

  useEffect(() => {
    const value = tools.findIndex((tool) => {
      if (pathname !== '/' && tool.route !== '/') {
        if (tool.items) return tool.items.find((item) => pathname?.includes(item.route));
        else return pathname?.includes(tool.route);
      }
    });
    if (value >= 0) {
      if (!open?.includes(value + 1)) setOpen((pre) => [...pre, value + 1]);
    }
  }, [pathname]);

  return (
    <div
      className={`fixed left-0 inset-y-0 h-screen z-40 w-full max-w-[18rem] shadow-custom flex flex-col justify-between
      transition-all duration-500 ease-in-out bg-sidebar ${showSidebar ? '' : '-translate-x-full'}`}
    >
      <div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-4 p-4">
            <Logo />
          </div>
        </div>
        <hr className="mx-4" />
        <nav className="flex flex-col gap-1 text-sm font-normal text-inherit h-sidebar overflow-scroll mt-4 px-4">
          {tools?.map((item, index) => {
            const Icon = icons[item.icon];
            if (!item.items) return <NavItem key={index} item={item} pathname={pathname} Icon={Icon} />;
            else
              return <NavGroup key={index} item={item} value={index + 1} open={open} setOpen={setOpen} pathname={pathname} Icon={Icon} />;
          })}
        </nav>
      </div>
      <div className="p-4">
        <hr className="my-3" />
        <Buttonz onClick={onSignOut} className="w-full">
          Đăng xuất
        </Buttonz>
      </div>
    </div>
  );
};
