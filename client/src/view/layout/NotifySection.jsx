import { Buttonz } from '@components/core';
import { BellIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

export const NotifySection = () => {
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative items-center">
      <Buttonz
        onClick={() => setIsShow(!isShow)}
        className="!p-0 h-9 w-9 flex justify-center items-center"
        icon={<BellIcon className="w-6 stroke-1" />}
      />
      <div
        className={`absolute right-0 mt-4 w-80 bg-white shadow-custom rounded-sm transition-all z-50
          duration-200 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="mx-4">
          <div className="flex justify-between items-center h-16 mb-0">
            <h4 className="text-md">All Notification</h4>
            <span className="text-sm text-primary cursor-pointer hover:text-blue-800">
              Mark all as read
            </span>
          </div>
          <hr/>
          <div className='min-h-48'></div>
        </div>
      </div>
    </div>
  );
};
