import { CssBaseline } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/index.js';
import { router } from './routes/index';
import './index.css';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { REFRESH } from './gql/mutations.ts';
import { devtoolsExchange } from '@urql/devtools';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

async function initializeAuthState() {
  const accessToken = await localStorage.getItem('access_token');
  const refreshToken = await localStorage.getItem('refresh_token');
  return { accessToken, refreshToken };
}
const client = new Client({
  url: 'http://[::]:8000/graphql',
  exchanges: [
    devtoolsExchange,
    cacheExchange,
    authExchange(async (utils) => {
      debugger;
      let { accessToken, refreshToken } = await initializeAuthState();
      return {
        addAuthToOperation(operation) {
          if (!accessToken) return operation;
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${accessToken}`,
          });
        },
        didAuthError(error, _operation) {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === 'FORBIDDEN'
          );
        },
        // async refreshAuth() {
        //   // debugger
        //   // const result = await utils.mutate(REFRESH, { refreshToken });

        //   // if (result.data?.refreshToken) {
        //   //   // Update our local variables and write to our storage
        //   //   let token = result.data.refreshToken.token;
        //   //   // refreshToken = result.data.refreshLogin.refreshToken;
        //   //   localStorage.setItem('access_token', token);
        //   //   // localStorage.setItem('refreshToken', refreshToken);
        //   // } else {
        //   //   // This is where auth has gone wrong and we need to clean up and redirect to a login page
        //   //   localStorage.clear();
        //   //   // logout();
        //   // }
        // },
      };
    }),
    fetchExchange,
  ],
  requestPolicy: 'network-only',
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
