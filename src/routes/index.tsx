import AuthenticatedWrapper from '@/components/AuthenticatedWrapper';
import UnauthenticatedWrapper from '@/components/UnauthenticatedWrapper';
import AboutPage from '@/pages/Authenticated/About';
import BranchesPage from '@/pages/Authenticated/Branches';
import HomePage from '@/pages/Authenticated/Home';
import ProductsPage from '@/pages/Authenticated/Products';
import RequestDetailPage from '@/pages/Authenticated/RequestDetail';
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
        path: 'products',
        element: <ProductsPage />,
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
      {
        path: 'branches',
        element: <BranchesPage />,
      },
      {
        path: 'requests/detail',
        element: <RequestDetailPage />,
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
