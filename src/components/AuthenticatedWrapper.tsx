import { IS_AUTHENTICATED } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedWrapper = () => {
  return IS_AUTHENTICATED ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <Navigate to='/auth/sign-in' replace />
  );
};

export default AuthenticatedWrapper;
