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
import Servicios from './pages/servicios/servicios';
import Contactanos from './pages/contactanos/contactanos';
import ResponderSolicitudes from './pages/administrador/GestionarSolicitudes/ResponderSolicitudes';
import MensajesRespondidos from './pages/administrador/GestionarSolicitudes/MensajesRespondidos';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

//Seccion para clientes

import MenuCliente from './pages/cliente/clienteMenu';

import AgregarEvidencia from './pages/cliente/caso/evidencias/agregarEvidencia';
import RegistrosCrud from './pages/cliente/caso/registros/RegistrosCrud';
import AgregarRegistrosForm from './pages/cliente/caso/registros/AgregarRegistrosForm';
import EditarRegistroForm from './pages/cliente/caso/registros/editarRegistroForm';
import CasoDetailsMenu from './pages/cliente/caso/CasoDetailsMenu';
import EvidenciasCrud from './pages/cliente/caso/evidencias/EvidenciasCrud';

//Historial 
import HistorialCasoDetailsMenu from './pages/cliente/historial/HistorialCasoDetailsMenu';
import NovedadesHistorial from './pages/detective/auditoria/NovedadesHistorial'
import InformacionHistorial from './pages/cliente/historial/InformacionHistorial';
import GestionarHistorial from './pages/cliente/historial/GestionarHistorial';
import VerAuditoria from './pages/cliente/historial/auditoria/VerAuditoria';

//Seccion para detectives 

import DetectiveMenu from './pages/detective/detectiveMenu';

import NavbarSidebarDetective from './pages/detective/NavbarSidebarDetective';
import DetectiveCasoDetailsMenu from './pages/detective/caso/DetectiveCasoDetailsMenu';
import AgregarEvidenciaDetective from './pages/detective/caso/evidencia/agregarEvidenciaDetective';
import AgregarRegistroFormDetective from './pages/detective/caso/registros/AgregarRegistrosFormDetective';
import EvidenciasCrudDetective from './pages/detective/caso/evidencia/EvidenciasCrudDetective';

//Historial 
import HistorialCasoDetailsMenuDetective from './pages/detective/historial/HistorialCasoDetailsMenuDetective'
import GestionarHistorialDetective from './pages/detective/historial/GestionarHistorialDetective';





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


          
          {/* Rutas compartidas */}
          <Route element={<ProtectedRoute roles={['cliente','detective']} />}>
           <Route path='novedades-historial' element={<NovedadesHistorial/>}/>
          </Route>
          


          {/* Rutas protegidas - solo para administradores */}
          <Route element={<ProtectedRoute roles={['administrador']} />}>
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/detective-form" element={<DetectiveForm />} />
          <Route path="/cliente-form" element={<ClienteForm />} />
          <Route path="/administrador-form" element={<AdministradorForm />} />
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
          <Route element={<ProtectedRoute roles={['cliente','detective']} />}>
            <Route path="/cliente-menu" element={<MenuCliente />} />
            <Route path="/caso-details" element={<CasoDetailsMenu />} />
             <Route path="/agregar-evidencia/:casoId" element={<AgregarEvidencia />} />
             <Route path="/evidencias-crud" element={<EvidenciasCrud />} />         
            <Route path="/registros-crud" element={<RegistrosCrud />} />
            <Route path='/agregar-registros/:casoId' element={<AgregarRegistrosForm />} />
            <Route path='/editar-registros/:registroId' element={<EditarRegistroForm />} />
            <Route path='historial-details' element={<HistorialCasoDetailsMenu/>}/>
            
            <Route path='informacion-general' element={<InformacionHistorial/>}/>
            <Route path='Gestionar-historial' element={<GestionarHistorial/>}/>
            <Route path='ver-auditorias' element={<VerAuditoria/>}/>

          </Route>

          {/* Rutas protegidas - solo para detectives */}
          <Route element={<ProtectedRoute roles={['detective']} />}>
            <Route path="/detective-menu" element={<DetectiveMenu />} />
            <Route path="/agregar-evidencia-detective/:casoId" element={<AgregarEvidenciaDetective />} />
            <Route path="/NavbarSidebarDetective" element={<NavbarSidebarDetective/>}/>
            <Route path= "/DetectiveCasoDetailsMenu" element= {<DetectiveCasoDetailsMenu/>}/>
            <Route path="/AgregarRegistroFormDetective" element= {<AgregarRegistroFormDetective/>}/>
            <Route path="/HistorialCasoDetailsMenuDetective" element = {<HistorialCasoDetailsMenuDetective/>}/>
            <Route path="Gestion-historial-detective" element = {<GestionarHistorialDetective/>}/>
            <Route path="Gestion-evidencias-detective" element = {<EvidenciasCrudDetective/>}/>   

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
