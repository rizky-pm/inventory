import { checkAuth } from '@/utils';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const UnauthenticatedWrapper = () => {
  const location = useLocation();
  const isAuthenticated = checkAuth();

  if (location.pathname === '/auth') {
    return <Navigate to='/auth/sign-in' replace />;
  }

  return isAuthenticated ? (
    <Navigate to={'/'} replace />
  ) : (
    <main>
      <Outlet />
    </main>
  );
};

export default UnauthenticatedWrapper;
