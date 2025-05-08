// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//     setIsAuthenticated(!!token);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("ecommerce_login", JSON.stringify(userData));
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("ecommerce_login");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// ==============================


// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null); // NEW

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("ecommerce_login"));
//     if (stored?.jwtToken) {
//       setIsAuthenticated(true);
//       setUser(stored.user || stored.admin || null); // handles both admin and user
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("ecommerce_login", JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData.user || userData.admin); // assumes one or the other is defined
//   };

//   const logout = () => {
//     localStorage.removeItem("ecommerce_login");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// ==========================


import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ecommerce_login"));
    if (stored?.jwtToken) {
      setIsAuthenticated(true);
      setUser(stored.user || stored.admin || null);
    }
  }, []);
  

  const login = (userData) => {
    localStorage.setItem("ecommerce_login", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData.user || userData.admin);
  };

  const logout = () => {
    localStorage.removeItem("ecommerce_login");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };

      // Also update localStorage
      const stored = JSON.parse(localStorage.getItem("ecommerce_login"));
      if (stored) {
        const updatedStored = {
          ...stored,
          user: newUser,
        };
        localStorage.setItem("ecommerce_login", JSON.stringify(updatedStored));
      }

      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
