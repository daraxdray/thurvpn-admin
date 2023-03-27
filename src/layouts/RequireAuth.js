import { Navigate, useLocation } from 'react-router-dom';
import ROUTEPATH from '../utils/routePath';
import { useSelector } from 'react-redux';
const RequireAuth = ({children}) => {
  const auth = useSelector((state) => state.auth.value)
  const location = useLocation();
  

  return <>{auth?.user ?
    children :
     <Navigate to={ROUTEPATH.login} state={{ from: location }} replace />}</>;
};

export default RequireAuth;
