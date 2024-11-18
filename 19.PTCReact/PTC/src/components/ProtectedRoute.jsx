import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que AuthContext esté exportado correctamente

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useContext(AuthContext); // Asegúrate de que el contexto 'user' esté configurado correctamente

  if (!user || !roles.includes(user.role)) {
    // Si el usuario no está autenticado o su rol no está permitido, redirige al login
    return <Navigate to="/login" />;
  }

  return children; // Si el usuario tiene el rol adecuado, permite el acceso
};

export default ProtectedRoute;
