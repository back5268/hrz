import { getInfoApi, getListAccountInfoApi, getListDepartmentInfoApi } from '@api';
import { ProgressSpinnerz } from '@components/core';
import { useDataState, useUserState } from '@store';
import { Fragment, useEffect, useState } from 'react';

export const AuthProvider = ({ children }) => {
  const { setAccounts, setDepartments } = useDataState();
  const { setUserInfo, loadingz } = useUserState();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
        const accounts = await getListAccountInfoApi();
        if (accounts) setAccounts(accounts);
        const departments = await getListDepartmentInfoApi();
        if (departments) setDepartments(departments);
      } else localStorage.removeItem('token');
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkAuth();
    else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loadingz]);

  if (loading)
    return (
      <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
        <ProgressSpinnerz style={{ width: '50px', height: '50px' }} strokeWidth="6" animationDuration="1s" />
      </div>
    );

  return <Fragment>{children}</Fragment>;
};
