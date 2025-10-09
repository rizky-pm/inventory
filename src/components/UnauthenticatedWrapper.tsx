import { IS_AUTHENTICATED } from '@/constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const UnauthenticatedWrapper = () => {
  const location = useLocation();

  if (location.pathname === '/auth') {
    return <Navigate to='/auth/sign-in' replace />;
  }

  return IS_AUTHENTICATED ? (
    <Navigate to={'/'} replace />
  ) : (
    <main>
      <Outlet />
    </main>
  );
};

export default UnauthenticatedWrapper;
