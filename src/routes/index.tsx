import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import BaseLayout from '../layout/BaseLayout';
import AppLayout from '../layout/AppLayout';

const Landing = lazy(() => import('./landing/Landing'));
const LoginPage = lazy(() => import('./auth/Login'));
const SignUp = lazy(() => import('./auth/SignUp'));
const DashboardPage = lazy(() => import('./dashboard/Dashboard'));
const ProfilePage = lazy(() => import('./profile/Profile'));
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
          { path: 'signUp', element: <SignUp /> },
        ],
      },
      {
        path: '',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
