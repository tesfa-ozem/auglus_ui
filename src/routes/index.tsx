import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import BaseLayout from '../layout/BaseLayout';

const Landing = lazy(() => import('./landing/Landing'));
const LoginPage = lazy(() => import('./auth/Login'));
const DashboardPage = lazy(() => import('./dashboard/Dashboard'));

export const router = createBrowserRouter([
    {
        path: '',
        element: <BaseLayout />,
        // errorElement: <RootError />,
        children: [
            { index: true, element: <Navigate to="/landing" replace /> },
            { path: 'landing', element: <Landing /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
        ],
    },
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
