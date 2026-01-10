import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import dotenv from 'dotenv';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserProvider from '../Context';
import UserEmailVerification from './pages/UserEmailVerification';
import PasswordResetVerification from './pages/PasswordResetVerification';
import Organization from './pages/Organization';
import AllProjects from './pages/AllProjects';
import Project from './pages/Project';
import AddMemberVerify from './pages/AddMemberVerify';
import MyTasks from './pages/MyTasks';
import TaskPage from './pages/TaskPage';

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
        {
          path: '/organization/:id',
          element: <Organization />,
        },
        {
          path: '/myprojects',
          element: <AllProjects />,
        },
        {
          path: '/project/:id',
          element: <Project />,
        },
        {
          path: '/api/v1/project/addMember',
          element: <AddMemberVerify />,
        },
        {
          path: '/mytasks',
          element: <MyTasks />,
        },
        {
          path: '/task/:projectId/:taskId',
          element: <TaskPage />,
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
