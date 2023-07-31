import { GlobalStyles } from '@mui/material';
import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BaseLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
    
      <GlobalStyles
        styles={{
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            // minHeight: "100vh",
          },
        }}
      />
      {/*<Toolbar />*/}
      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default BaseLayout;
