import { GlobalStyles } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
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

export default AppLayout;
