import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Manejar el token en el estado global
  const login = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      localStorage.setItem('accessToken', token); // Guardar el nuevo token
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    } catch (error) {
      console.error("Error decodificando el token", error);
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  useEffect(() => {
    // Recuperar el token al cargar la aplicación
    const token = localStorage.getItem('accessToken');
    if (token) {
      login(token); // Decodificar y establecer el usuario automáticamente
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
