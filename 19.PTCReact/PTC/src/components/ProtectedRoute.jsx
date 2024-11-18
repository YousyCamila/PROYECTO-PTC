import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto

  if (!user) {
    // Si no hay usuario (no está logueado)
    return <Navigate to="/login" replace />;
  }

  // Verifica si el rol del usuario coincide con alguno de los roles permitidos
  if (!roles.includes(user.role)) {
    // Si el rol no tiene permiso, redirige a una página de acceso denegado o a otra página
    return <Navigate to="/acceso-denegado" replace />;
  }

  // Si el usuario tiene el rol adecuado, renderiza el contenido de la ruta protegida
  return <Outlet />;
};

export default ProtectedRoute;
