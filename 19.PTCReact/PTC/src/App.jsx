import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/home';
import Register from '../src/pages/login/registro';
import Login from '../src/pages/login/login';  // El componente de login que ya tienes
import DetectiveForm from '../src/pages/login/detectiveForm'; // Asegúrate de que la ruta sea correcta
import ClienteForm from './pages/login/clienteForm';
import { useState } from 'react'; // Importa useState
import AdministradorForm from './pages/login/administradorForm';
import AdminMenu from '../src/pages/administrador/adminMenu';
import GestionarClientes from '../src/pages/administrador/gestionarClientes/gestionarClientes';
import CrearCliente from './pages/administrador/gestionarClientes/crearCliente';
import EditarCliente from './pages/administrador/gestionarClientes/editarCliente';
import GestionarDetectives from './pages/administrador/gestionDetectives/gestionarDetectives';
import CrearDetective from './pages/administrador/gestionDetectives/crearDetective';
import DetallesCliente from './pages/administrador/gestionarClientes/detallesCliente';
import DetallesDetective from './pages/administrador/gestionDetectives/detallesDetective';
import EditarDetective from './pages/administrador/gestionDetectives/editarDetective';
import GestionarCasos from './pages/administrador/gestionCasos/gestionarCasos';
import CrearCaso from './pages/administrador/gestionCasos/crearCaso';
import EditarCaso from './pages/administrador/gestionCasos/editarCaso';
import DetallesCaso from './pages/administrador/gestionCasos/detallesCaso';
import GestionarContratos from './pages/administrador/gestionContrato/gestionarContrato';
import CrearContrato from './pages/administrador/gestionContrato/crearContrato';
import DetallesContrato from './pages/administrador/gestionContrato/detallesContrato';
import EditarContrato from './pages/administrador/gestionContrato/editarContrato';
import MenuCliente from './pages/cliente/clienteMenu';
import AgregarEvidencia from './pages/cliente/agregarEvidencia';
import DetectiveMenu from './pages/detective/detectiveMenu';
import Servicios from './pages/servicios/servicios';

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
        <Route path="/servicios" element={<Servicios />} />

        <Route path="/admin-menu" element={<AdminMenu />} />

        <Route path="/gestionar-clientes" element={<GestionarClientes />} />

        <Route path="/crear-cliente" element={<CrearCliente />} />

        <Route path="/editar-cliente/:id" element={<EditarCliente />} />

        <Route path="/detalles-cliente/:id" element={<DetallesCliente />} />

        <Route path="/gestionar-detectives" element={<GestionarDetectives />} />

        <Route path="/crear-detective" element={<CrearDetective />} />

        <Route path="/detalles-detective/:id" element={<DetallesDetective />} />

        <Route path="/editar-detective/:id" element={<EditarDetective />} />

        <Route path="/gestionar-Casos" element={<GestionarCasos />} />

        <Route path="/crear-caso" element={<CrearCaso />} />

        <Route path="/editar-caso/:id" element={<EditarCaso />} />

        <Route path="/detalles-caso/:id" element={<DetallesCaso />} />

        <Route path="/gestionar-contratos" element={<GestionarContratos />} />

        <Route path="/crear-contrato" element={<CrearContrato />} />

        <Route path="/detalles-contrato/:id" element={<DetallesContrato />} />

        <Route path="/editar-contrato/:id" element={<EditarContrato />} />

        <Route path="/cliente-menu" element={<MenuCliente />} />

        <Route path="/detective-menu" element={<DetectiveMenu />} />

        <Route path="/agregar-evidencia/:casoId" element={<AgregarEvidencia />} />



      </Routes>
    </Router>
  );
}

export default App;
