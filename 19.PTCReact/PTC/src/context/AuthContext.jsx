import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded.exp * 1000 < Date.now(); // Convertir a milisegundos
    } catch (error) {
      return true; // Si hay error, consideramos que el token es inválido
    }
  };

  // Función de inicio de sesión
  const login = (token) => {
    try {
      const decodedToken = jwt_decode(token);

      if (isTokenExpired(token)) {
        throw new Error("Token expirado");
      }

      // Guardar token en localStorage
      localStorage.setItem('accessToken', token);

      // Guardar el email separado según el rol
      if (decodedToken.role === 'cliente') {
        localStorage.setItem('email_cliente', decodedToken.email);
        localStorage.removeItem('email_detective');
      } else if (decodedToken.role === 'detective') {
        localStorage.setItem('email_detective', decodedToken.email);
        localStorage.removeItem('email_cliente');
      }

      // Establecer usuario en el estado global
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      });

    } catch (error) {
      console.error("Error al procesar el token:", error);
      logout();
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email_cliente');
    localStorage.removeItem('email_detective');
    setUser(null);
  };

  // Efecto para restaurar sesión automáticamente si hay un token válido
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token && !isTokenExpired(token)) {
      try {
        const decodedToken = jwt_decode(token);
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } catch (error) {
        console.error("Error procesando el token al cargar la app:", error);
        logout();
      }
    } else {
      logout();
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {isLoading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};
