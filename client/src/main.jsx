import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from '@lib/react-query';
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider, LazyLoading, NavigationScroll, ScrollToTop, Toastify } from '@components/base';
import { ConfirmDialogz } from '@components/core';

import App from './App';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './styles/index.css';
import './styles/editor.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryProvider>
      <PrimeReactProvider value={{ ripple: true }}>
        <AuthProvider>
          <ConfirmDialogz />
          <Toastify />
          <LazyLoading />
          <ScrollToTop />
          <NavigationScroll>
            <App />
          </NavigationScroll>
        </AuthProvider>
      </PrimeReactProvider>
    </QueryProvider>
  </BrowserRouter>
);
