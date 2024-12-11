import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/login/registro';
import Login from './pages/login/login';  
import DetectiveForm from './pages/login/detectiveForm';
import ClienteForm from './pages/login/clienteForm';
import AdministradorForm from './pages/login/administradorForm';
import AdminMenu from './pages/administrador/adminMenu';
import GestionarClientes from './pages/administrador/gestionarClientes/gestionarClientes';
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
import Contactanos from './pages/contactanos/contactanos';
import ResponderSolicitudes from './pages/administrador/GestionarSolicitudes/ResponderSolicitudes';
import MensajesRespondidos from './pages/administrador/GestionarSolicitudes/MensajesRespondidos';
import CasoDetailsMenu from './pages/cliente/CasoDetailsMenu';
import EvidenciasCrud from './pages/cliente/EvidenciasCrud';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegistroCaso from './pages/cliente/RegistrosCrud';
import AgregarRegistrosForm from './pages/cliente/AgregarRegistrosForm';
import EditarRegistroForm from './pages/cliente/editarRegistroForm';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/servicios" element={<Servicios />} />

          {/* Rutas protegidas - solo para administradores */}
          <Route element={<ProtectedRoute roles={['administrador']} />}>
          <Route path="/detective-form" element={<DetectiveForm />} />
          <Route path="/cliente-form" element={<ClienteForm />} />
          <Route path="/administrador-form" element={<AdministradorForm />} />
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
            <Route path="/responder-solicitudes" element={<ResponderSolicitudes />} />
            <Route path="/mensajes-respondidos" element={<MensajesRespondidos />} />
          </Route>

          {/* Rutas protegidas - solo para clientes */}
          <Route element={<ProtectedRoute roles={['cliente']} />}>
            <Route path="/cliente-menu" element={<MenuCliente />} />
            <Route path="/caso-details" element={<CasoDetailsMenu />} />
            <Route path="/evidencias-crud" element={<EvidenciasCrud />} />
            <Route path="/agregar-evidencia/:casoId" element={<AgregarEvidencia />} />
            <Route path="/registros-crud" element={<RegistroCaso />} />
            <Route path='/agregar-registros/:casoId' element={<AgregarRegistrosForm />} />
            <Route path='/editar-registros/:registroId' element={<EditarRegistroForm />} />

          </Route>

          {/* Rutas protegidas - solo para detectives */}
          <Route element={<ProtectedRoute roles={['detective']} />}>
            <Route path="/detective-menu" element={<DetectiveMenu />} />
            <Route path="/agregar-evidencia/:casoId" element={<AgregarEvidencia />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
