// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Import useAuth()

// const PrivateRoute = () => {
//   const { user } = useAuth(); // Access user data from context

//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  const hasAccess = user.role?.some((role) =>
    allowedRoles.includes(role.roleName)
  );

  return hasAccess ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
