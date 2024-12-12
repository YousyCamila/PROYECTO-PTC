import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      try {
        // Decodificar el token sin validación estricta
        const decodedToken = jwt_decode(token);
        
        // Establecer el usuario con la información del token
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } catch (error) {
        console.error("Error procesando el token", error);
        localStorage.removeItem('accessToken');
        setUser(null);
      }
    }
    
    // Establecer carga como falsa 
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isLoading 
    }}>
      {isLoading ? (
        <div>Cargando...</div> // Puedes reemplazar esto con un spinner de carga
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};