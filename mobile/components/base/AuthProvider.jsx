import { getInfoApi } from '@/api';
import { Loaderz } from '@/components/core';
import { useUserState } from '@/store';
import { Fragment, useEffect, useState } from 'react';

export const AuthProvider = ({ children }) => {
  const { setUserInfo, loadingz } = useUserState();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
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

  if (loading) return <Loaderz className="h-8 w-8 border-4" />;
  return <Fragment>{children}</Fragment>;
};
