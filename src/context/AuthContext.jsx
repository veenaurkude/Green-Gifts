import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
    setIsAuthenticated(!!token);
  }, []);

  const login = (userData) => {
    localStorage.setItem("ecommerce_login", JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("ecommerce_login");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
