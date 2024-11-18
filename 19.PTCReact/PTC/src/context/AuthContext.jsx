import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Si hay un token, decodificarlo y establecer el usuario
      const decodedToken = jwt_decode(token);
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      });
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
