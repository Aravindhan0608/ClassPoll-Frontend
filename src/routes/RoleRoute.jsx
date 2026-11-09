import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ROUTES } from '../utils/constants.js';

const roleHome = {
  student: ROUTES.STUDENT_DASHBOARD,
  teacher: ROUTES.TEACHER_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
};

/**
 * Restricts a subtree to one or more roles. If the logged-in user has a
 * different role, they're redirected to their own dashboard instead of
 * seeing a dead end — they're authenticated, just in the wrong place.
 */
const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return null; // ProtectedRoute above this handles the unauthenticated case

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={roleHome[user.role] || ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
