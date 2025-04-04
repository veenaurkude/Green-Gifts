import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("ecommerce_login")); // Check if user is logged in

  return user?.jwtToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;



// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const PrivateRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />; // Redirect if not logged in
//   }

//   const hasAccess = user.role?.some((role) =>
//     allowedRoles.includes(role.roleName)
//   );

//   return hasAccess ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;
