import { Logo } from '@components/base';
import { Buttonz } from '@components/core';
import {
  BuildingOffice2Icon,
  CalculatorIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  ServerIcon,
  Squares2X2Icon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { NavGroup } from './NavGroup';
import { tools } from '@lib/tools';

const icons = {
  Squares2X2Icon,
  ChartBarIcon,
  BuildingOffice2Icon,
  ServerIcon,
  UsersIcon,
  Cog6ToothIcon,
  CalculatorIcon,
  ComputerDesktopIcon
};

export const SideBar = (props) => {
  const { showSidebar, onSignOut } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState([]);

  return (
    <div
      className={`fixed left-0 inset-y-0 h-screen z-40 w-full max-w-[18rem] shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between
      bg-sidebar text-on-sidebar transition-all duration-500 ease-in-out ${showSidebar ? '' : '-translate-x-full'}`}
    >
      <div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-4 p-4">
            <Logo />
          </div>
        </div>
        <hr className="mx-4" />
        <nav className="flex flex-col gap-1 text-base font-normal mt-4 px-4">
          {tools?.map((item, index) => {
            const type = item.children?.length <= 1 ? 'item' : 'group';
            const Icon = icons[item.icon];
            if (type === 'item') return <NavItem key={index} item={item.children[0]} pathname={pathname} Icon={Icon} />;
            else
              return <NavGroup key={index} item={item} value={index + 1} open={open} setOpen={setOpen} pathname={pathname} Icon={Icon} />;
          })}
        </nav>
      </div>
      <div className="p-4">
        <hr className="my-3 border-on-sidebar" />
        <Buttonz onClick={onSignOut} className="w-full">
          Đăng xuất
        </Buttonz>
      </div>
    </div>
  );
};
