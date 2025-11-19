import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/appLayout';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import dotenv from 'dotenv';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserProvider from '../Context';
import UserEmailVerification from './pages/UserEmailVerification';
import PasswordResetVerification from './pages/PasswordResetVerification';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/auth',
          element: <Auth />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/api/v1/auth/verify-email',
          element: <UserEmailVerification />,
        },
        {
          path: '/api/v1/auth/reset-password',
          element: <PasswordResetVerification />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
