import { CssBaseline } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/index.js';
import { router } from './routes/index';
import './index.css';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
const client = new Client({
  url: 'http://[::]:8000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

// Render the top-level React component
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <Provider value={client}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
