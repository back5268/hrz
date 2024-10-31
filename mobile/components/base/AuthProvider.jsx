import { getInfoApi, getListAccountInfoApi, getListDepartmentInfoApi, getListJobPositionInfoApi, getListPositionInfoApi } from '@/api';
import { Loadingz } from '@/components/core';
import { useDataState, useUserState } from '@/store';
import { Fragment, useEffect, useState } from 'react';

export const AuthProvider = ({ children }) => {
  const { setUserInfo, loadingz } = useUserState();
  const { setAccounts, setDepartments, setPositions, setJobPositions } = useDataState();
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
        const positions = await getListPositionInfoApi();
        if (positions) setPositions(positions);
        const jobPositions = await getListJobPositionInfoApi();
        if (jobPositions) setJobPositions(jobPositions);
      }
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    checkAuth();
  }, [loadingz]);

  if (loading) return <Loadingz className="h-8 w-8 border-4" root={true} />;
  return <Fragment>{children}</Fragment>;
};
