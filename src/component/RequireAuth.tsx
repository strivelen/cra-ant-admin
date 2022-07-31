import { selectToken } from 'features/user/userSlice';
import { useAppSelector } from 'app/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
  const location = useLocation();
  const token = useAppSelector(selectToken);
  if (!token) {
    return <Navigate to="/login" state={location} replace />;
  }
  return <Outlet />;
}
