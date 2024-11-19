import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken); // Verifica el contenido del token
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } catch (error) {
        console.error("Error decodificando el token", error);
        localStorage.removeItem('accessToken');
      }
    } else {
      setUser(null); // Si no hay token, el usuario es null
    }
  }, []);
  

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
