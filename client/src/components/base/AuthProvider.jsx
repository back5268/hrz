import { getInfoApi } from '@api';
import { ProgressSpinnerz } from '@components/core';
import { useUserState } from '@store';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setUserInfo, loadingz } = useUserState();
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else {
        localStorage.removeItem('token');
        navigate('/auth/sign-in');
      }
    } catch (error) {
      navigate('/auth/sign-in');
      return false;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) checkAuth();
    else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      navigate('/auth/sign-in');
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
