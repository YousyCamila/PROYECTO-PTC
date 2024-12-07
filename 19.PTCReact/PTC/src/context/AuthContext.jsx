import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const isTokenExpired = decodedToken.exp * 1000 < Date.now();
          if (isTokenExpired) {
            console.warn('Token expirado. Eliminando...');
            localStorage.removeItem('accessToken');
            setUser(null);
          } else {
            setUser({
              id: decodedToken.id,
              email: decodedToken.email,
              role: decodedToken.role,
            });

            // Intentar renovar el token si está por expirar
            const expiresIn = decodedToken.exp * 1000 - Date.now();
            if (expiresIn < 5 * 60 * 1000) {
              console.log('Intentando renovar el token...');
              await refreshToken();
            }
          }
        } catch (error) {
          console.error('Error decodificando el token', error);
          localStorage.removeItem('accessToken');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include', // Necesario si usas cookies
      });
      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem('accessToken', accessToken);
        const decodedToken = jwt_decode(accessToken);
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } else {
        console.error('Error renovando el token');
        logout();
      }
    } catch (error) {
      console.error('Error al intentar renovar el token', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Cargando...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
