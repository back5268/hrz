import { Buttonz } from '@components/core';
import { Bars3Icon } from '@heroicons/react/24/outline';
import React from 'react';
import { NotifySection } from './NotifySection';
import { AvatarSection } from './AvatarSection';

export const TopBar = (props) => {
  const { showSidebar, setShowSidebar, onSignOut } = props;

  return (
    <div className="fixed top-0 inset-x-0 px-6 z-10">
      <div className={`h-14 transition-all duration-500 ease-in-out bg-white ${showSidebar ? 'lg:ml-[18rem]' : ''}`}>
        <div className="flex justify-between items-center h-full">
          <Buttonz
            onClick={() => setShowSidebar(!showSidebar)}
            className="!p-0 h-9 w-9 flex justify-center items-center"
            icon={<Bars3Icon className="w-8 stroke-1" />}
          />
          <div className="flex gap-4 justify-between items-center mr-2">
            <NotifySection />
            <AvatarSection onSignOut={onSignOut} />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};