import { CssBaseline } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/index.js';
import { router } from './routes/index';
import './index.css';

import { REFRESH } from './gql/mutations.ts';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  Observable,
  FetchResult,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

const httpLink = createHttpLink({
  uri: 'http://[::]:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      for (let err of graphQLErrors) {
        if (err.extensions.code == 'FORBIDDEN') {
          const observable = new Observable<FetchResult<Record<string, any>>>(
            (observer) => {
              (async () => {
                try {
                  const accessToken = await refreshToken();

                  if (!accessToken) {
                    throw new GraphQLError('Empty AccessToken');
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  forward(operation).subscribe(subscriber);
                } catch (err) {
                  // TODO: Redirect to logout screen
                  observer.error(err);
                }
              })();
            }
          );
          // if (networkError) console.log(`[Network error]: ${networkError}`);
          return observable;
        }
      }
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    const refreshResolverResponse = await client.mutate({
      mutation: REFRESH,
      variables: { refreshToken: refresh_token },
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    localStorage.setItem('access_token', accessToken || '');
    return accessToken;
  } catch (err) {
    // TODO: Reirect to login screen
    localStorage.clear();
    throw err;
  }
};
// Render the top-level React component
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
