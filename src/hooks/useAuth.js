import { useContext } from 'react';
import AuthProvider from '../providers/auth-providers';

export const useAuth = () => {
  return useContext(AuthProvider);
};

export default useAuth;
