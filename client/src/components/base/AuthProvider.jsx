import { getInfoApi } from '@api';
import { Loadingz } from '@components/core';
import { useUserState } from '@store';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setUserInfo, loadingz } = useUserState();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else {
        localStorage.removeItem('token');
        navigate('/auth/signin');
      }
    } catch (error) {
      navigate('/auth/signin');
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    } else {
      setIsLoading(false);
      navigate('/auth/signin');
    }
  }, [loadingz]);

  return <Fragment>{isLoading ? <Loadingz className="h-8 w-8 border-4" /> : children}</Fragment>;
};
