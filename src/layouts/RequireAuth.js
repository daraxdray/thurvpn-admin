import { Navigate, useLocation } from 'react-router-dom';
import ROUTEPATH from '../utils/routePath';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({children}) => {
  const auth = useSelector((state) => state.auth.value)
  const location = useLocation();
  console.log("USER IS LOGINED", auth)
  return <>{auth?.user ?
    children
    : <Navigate to={ROUTEPATH.login} state={{ from: location }} replace />}</>;
};

export default RequireAuth;
