import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { checkAuth } from '@/utils';

const AuthenticatedWrapper = () => {
  const isAuthenticated = checkAuth();

  return isAuthenticated ? (
    <div className='flex'>
      <Sidebar />

      <main className='flex justify-center ml-[250px] w-full'>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to='/auth/sign-in' replace />
  );
};

export default AuthenticatedWrapper;
