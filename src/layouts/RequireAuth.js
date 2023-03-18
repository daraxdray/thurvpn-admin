import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ROUTEPATH from '../utils/routePath';
import { Outlet } from 'react';

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();

  return <>{auth?.user ? <Outlet /> : <Navigate to={ROUTEPATH.login} state={{ from: location }} replace />}</>;
};

export default RequireAuth;
