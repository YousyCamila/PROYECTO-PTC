import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar useAuth

const ProtectedRoute = ({ element, roles, ...rest }) => {
  const { user } = useAuth(); // Obtiene el usuario desde el contexto de autenticación

  // Verifica si el usuario está autenticado y si tiene el rol adecuado
  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/login" />; // Redirige al login si no está autenticado o no tiene el rol
  }

  // Si el usuario está autenticado y tiene el rol, renderiza el componente
  return element;
};

export default ProtectedRoute;
