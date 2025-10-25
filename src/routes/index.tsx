import AuthenticatedWrapper from '@/components/AuthenticatedWrapper';
import UnauthenticatedWrapper from '@/components/UnauthenticatedWrapper';
import AboutPage from '@/pages/Authenticated/About';
import HomePage from '@/pages/Authenticated/Home';
import SettingsPage from '@/pages/Authenticated/Settings';
import SignInPage from '@/pages/Unauthenticated/SignIn';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },

      {
        path: 'accounts',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <UnauthenticatedWrapper />,
    children: [
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
    ],
  },
]);

export default router;
