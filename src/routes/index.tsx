import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import BaseLayout from '../layout/BaseLayout';
import AppLayout from '../layout/AppLayout';

const Landing = lazy(() => import('./landing/Landing'));
const LoginPage = lazy(() => import('./auth/Login'));
const DashboardPage = lazy(() => import('./dashboard/Dashboard'));
import ErrorPage from './error-page';
import { AuthLayout } from '../layout/AuthLayout';

export const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/landing" /> },
          { path: 'landing', element: <Landing /> },
          { path: 'login', element: <LoginPage /> },
        ],
      },
      {
        path: '',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [{ path: 'dashboard', element: <DashboardPage /> }],
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
