import { IS_AUTHENTICATED } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AuthenticatedWrapper = () => {
  return IS_AUTHENTICATED ? (
    <main className='flex'>
      <Sidebar />
      <Outlet />
    </main>
  ) : (
    <Navigate to='/auth/sign-in' replace />
  );
};

export default AuthenticatedWrapper;
