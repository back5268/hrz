import { Fragment } from 'react';
import { routes } from '@view/routes';
import { Route, Routes } from 'react-router-dom';
import { AccessDenied, ErrorPage } from '@view/default';
import { Layout } from '@view/layout';
import { useUserState } from '@store';

const App = () => {
  const { userInfo } = useUserState();

  return (
    <Routes>
      {routes.map((route, index) => {
        const DefaultLayout = route.layout ? Layout : Fragment;
        const Page = route.element;
        const checkPermission = route.public ? true : ['admin'].includes(userInfo.role);

        return (
          <Route
            key={index}
            path={route.path}
            element={
              checkPermission ? (
                <DefaultLayout>
                  <Page />
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
