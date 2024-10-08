import { Fragment } from 'react';
import { routes } from '@view/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccessDenied, ErrorPage } from '@view/default';
import { Layout } from '@view/layout';
import { useUserState } from '@store';

const App = () => {
  const { userInfo, isAuthenticated } = useUserState();

  return (
    <Routes>
      {routes.map((route, index) => {
        const DefaultLayout = route.layout ? Layout : Fragment;
        const isPublicRoute = route.public;
        const checkPermission = isPublicRoute ? true : ['admin'].includes(userInfo?.role);

        if (isPublicRoute && isAuthenticated) {
          return <Route key={index} path={route.path} element={<Navigate to="/" />} />;
        }
        
        if (!isPublicRoute && !isAuthenticated) {
          return <Route key={index} path={route.path} element={<Navigate to="/auth/sign-in" />} />;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              checkPermission ? (
                <DefaultLayout>
                  <route.element />
                </DefaultLayout>
              ) : (
                <AccessDenied />
              )
            }
          />
        );
      })}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
