import { GlobalStyles } from '@mui/material';
import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppToolbar from './components/AppToolbar';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
    <AppToolbar/>
      <GlobalStyles
        styles={{
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            // minHeight: "100vh",
          },
        }}
      />
      
      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default AppLayout;
