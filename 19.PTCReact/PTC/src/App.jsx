import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/home';
import Register from '../src/pages/login/registro';
import Login from '../src/pages/login/login';  // El componente de login que ya tienes
import DetectiveForm from '../src/pages/login/detectiveForm'; // Asegúrate de que la ruta sea correcta
import ClienteForm from './pages/login/clienteForm';
import { useState } from 'react'; // Importa useState
import AdministradorForm from './pages/login/administradorForm';
import AdminMenu from '../src/pages/administrador/adminMenu';
import GestionarClientes from '../src/pages/administrador/gestionarClientes';
import CrearCliente from './pages/administrador/crearCliente';
import EditarCliente from './pages/administrador/editarCliente';
import GestionarDetectives from './pages/administrador/gestionarDetectives';
import CrearDetective from './pages/administrador/crearDetective';
import DetallesCliente from './pages/administrador/detallesCliente';
import DetallesDetective from './pages/administrador/detallesDetective';
import EditarDetective from './pages/administrador/editarDetective';

function App() {
  const [email, setEmail] = useState(''); // Define el estado para el email

  // Función para actualizar el estado del email
  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página principal */}
        <Route path="/login" element={<Login />} />  {/* Página de Login */}
        <Route 
          path="/register" 
          element={<Register onEmailChange={handleEmailChange} />} // Pasa la función
        />
        <Route 
          path="/detective-form" 
          element={<DetectiveForm email={email} />} // Asegúrate de pasar el email
        />
         <Route 
          path="/cliente-form" 
          element={<ClienteForm email={email} />} // Asegúrate de pasar el email
        />
        <Route 
          path="/administrador-form" 
          element={<AdministradorForm email={email} />} // Asegúrate de pasar el email
        />
        <Route path="/admin-menu" element={<AdminMenu />} /> 

        <Route path="/gestionar-clientes" element={<GestionarClientes />} /> 

        <Route path="/crear-cliente" element={<CrearCliente />} />

        <Route path="/editar-cliente/:id" element={<EditarCliente />} />

        <Route path="/detalles-cliente/:id" element={<DetallesCliente />} />


        <Route path="/gestionar-detectives" element={<GestionarDetectives />} />

        <Route path="/crear-detective" element={<CrearDetective />} />

        <Route path="/detalles-detective/:id" element={<DetallesDetective />} />

        <Route path="/editar-detective/:id" element={<EditarDetective />} />



      </Routes>
    </Router>
  );
}

export default App;
