import { CssBaseline } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/index.js';
import { router } from './routes/index';
import './index.css';



const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

// Render the top-level React component
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      
        <RouterProvider router={router} />
      
    </ThemeProvider>
  </React.StrictMode>
);
