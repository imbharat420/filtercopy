import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../state/UserStore';

const RequiredAuth = (redirect) => {
  const { state } = useContext(UserContext);
  const token = state?.token;
  const location = useLocation();
  return !!token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
