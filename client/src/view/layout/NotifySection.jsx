import { getListNotifyApi, readAllNotifyApi, readNotifyApi, viewAllNotifyApi } from '@api';
import { Buttonz } from '@components/core';
import { BellIcon } from '@heroicons/react/24/outline';
import { useGetApi } from '@lib/react-query';
import { socket } from '@lib/socket-io';
import { useToastState, useUserState } from '@store';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const NotifySection = () => {
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [render, setRender] = useState(false);
  const { userInfo } = useUserState();
  const { showToast } = useToastState();
  const { data } = useGetApi(getListNotifyApi, { render }, 'notify');
  const numberView = data?.filter((d) => d.status === 1)?.length;

  const handleClickOutside = (e) => ref.current && !ref.current.contains(e.target) && setIsShow(false);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userInfo?._id) {
      const key = `notify_${userInfo?._id}`;
      const onConnect = () => console.log('Connecting...');
      const onDisconnect = (reason) => console.log('Disconnecting...', reason);
      function onEvent(event) {
        showToast({ title: "Bạn có một thông báo mới!", severity: 'info' });
        setRender((pre) => !pre);
      }
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on(key, onEvent);
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off(key, onEvent);
      };
    }
  }, [userInfo?._id]);

  const onClickNoti = async (item) => {
    const response = await readNotifyApi({ _id: item._id });
    if (response) {
      setRender((pre) => !pre);
      switch (item.type) {
        case 1:
          return navigate(`/posts/detail/${item?.data?.slug}`);
        case 2:
          return navigate(`/posts/detail/${item?.data?.slug}#${item?.data?._id}`);
      }
    }
  };

  return (
    <div ref={ref} className="relative items-center">
      <div className="relative">
        <Buttonz
          onClick={async () => {
            await viewAllNotifyApi();
            setRender((pre) => !pre);
            setIsShow(!isShow);
          }}
          className="!p-0 h-9 w-9 flex justify-center items-center"
          icon={<BellIcon className="w-6 stroke-1" />}
        />
        {numberView > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-primary-50 bg-red-400" />}
      </div>
      <div
        className={`absolute right-0 mt-4 w-96 bg-white shadow-custom rounded-sm transition-all z-50
          duration-200 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="mx-4">
          <div className="flex justify-between items-center h-16 mb-0">
            <h4 className="text-md">Thông báo</h4>
            <span
              onClick={async () => {
                await readAllNotifyApi();
                setRender((pre) => !pre);
              }}
              className="text-sm text-primary cursor-pointer hover:text-blue-800"
            >
              Đánh dấu đã đọc
            </span>
          </div>
          <hr />
          <div className="min-h-[32rem]">
            {data?.length > 0 ? (
              <>
                <div className="overflow-y-auto max-h-[60vh] text-gray-600">
                  <ul className="relative list-none">
                    <Hr />
                    {data?.map((item, index) => (
                      <li key={index}>
                        <div className="w-full">
                          <Link
                            onClick={() => onClickNoti(item)}
                            className={`flex cursor-pointer rounded-sm px-4 py-2 ${[0, 1].includes(item.status) ? 'bg-primary-50' : ''}
                      text-sm hover:bg-primary-100 hover:text-primaryhover:outline-none gap-4`}
                          >
                            <div className="h-12 w-12">
                              <div
                                className="h-12 w-12 rounded-full bg-black bg-cover"
                                style={{ backgroundImage: `url('${item?.account?.avatar || '/images/avatar.jpg'}')` }}
                              ></div>
                            </div>
                          </Link>
                        </div>
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <hr />
                <div className="h-16 text-gray-600 flex justify-center items-center">
                  <h5 className="font-medium">Bạn không có thông báo nào.</h5>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
