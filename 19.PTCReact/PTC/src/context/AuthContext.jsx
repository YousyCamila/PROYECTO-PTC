import React, { createContext, useState, useEffect, useContext } from 'react';

// Contexto para autenticación
export const AuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext); // Accede al contexto dentro de cualquier componente
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Aquí puedes verificar el token almacenado en localStorage o sesión
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si tienes un token, decodifícalo y establece el usuario
      const decodedUser = JSON.parse(atob(token.split('.')[1])); // Esto depende de cómo esté estructurado el token
      setUser(decodedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Guarda el token en localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Elimina el token cuando el usuario cierre sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
