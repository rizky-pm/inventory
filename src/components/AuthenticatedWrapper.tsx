import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { checkAuth } from '@/utils';

const AuthenticatedWrapper = () => {
  const isAuthenticated = checkAuth();

  return isAuthenticated ? (
    <main className='flex'>
      <Sidebar />
      <Outlet />
    </main>
  ) : (
    <Navigate to='/auth/sign-in' replace />
  );
};

export default AuthenticatedWrapper;
