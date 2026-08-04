import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getSession } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = ['admin'] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsAuthenticated(true);
      setUserRole(session.role || 'guest');
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === 'guest') {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/blogs" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  allowedRoles: PropTypes.arrayOf(PropTypes.oneOf(['admin', 'moderator', 'user', 'guest'])),
};

export default ProtectedRoute;