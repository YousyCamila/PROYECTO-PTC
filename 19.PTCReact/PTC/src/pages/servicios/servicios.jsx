import React from 'react';
import './servicios.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People'; // Icono para Investigación de Infidelidades
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Icono para Investigación de Fraudes
import SearchIcon from '@mui/icons-material/Search'; // Icono para Investigación de Desapariciones

const Servicios = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PTC</Typography>
          <Button color="inherit" href="/">Inicio</Button>
          <Button color="inherit" href="/servicios">Servicios</Button>
          <Button color="inherit" href="/contactanos">Contáctanos</Button>
          <Button color="inherit" href="/login">Inicio de Sesión</Button>
        </Toolbar>
      </AppBar>

      <section className="services-section">
        <div className="services-title">
          <h1>Nuestros Servicios</h1>
        </div>
        <div className="services-content">
          {/* Contenedor para la Agencia de Investigación Criminal */}
          <div className="service-container">
            <SecurityIcon className="icon" />
            <h3>Agencia de Investigación Criminal</h3>
            <p>Investigadores Privados especializados en cadena de custodia,
              extorsiones, secuestros, estudios de seguridad, infidelidades, robos,
              fraudes, desapariciones y antecedentes.</p>
            <p>Asesoría legal en todas las áreas del derecho.</p>
          </div>

          {/* Contenedor para Cadena de Custodia */}
          <div className="service-container">
            <VerifiedUserIcon className="icon" />
            <h3>Cadena de Custodia</h3>
            <p>Procedimiento de control y registro que se aplica a los indicios, vestigios, evidencias,
              huellas, instrumentos, objetos o productos relacionados con el delito.</p>
            <p>Realizando un acompañamiento según las leyes establecidas en la constitución política de
              Colombia y el manual de procedimiento para la cadena de custodia.</p>
          </div>

          {/* Contenedor para Extorsiones y Secuestros */}
          <div className="service-container">
            <ReportProblemIcon className="icon" />
            <h3>Extorsiones y Secuestros</h3>
            <p>Delitos de este tipo muchas veces son llevados a cabo por personas cercanas. Nuestros
              investigadores resuelven estos casos con un 89% de efectividad, asegurando la prevención y
              solución de estos crímenes.</p>
            <p>Evitar una extorsión o secuestro es posible con nuestros servicios.</p>
          </div>

          {/* Contenedor para Estudios de Seguridad */}
          <div className="service-container">
            <SecurityIcon className="icon" />
            <h3>Estudios de Seguridad</h3>
            <p>Realizamos estudios de seguridad empresariales y residenciales, análisis de riesgos, rutas de
              evacuación, y estructuramos un cordón de seguridad para prevenir vulnerabilidades.</p>
            <p>Nuestro personal altamente capacitado define y estudia cada riesgo en su entorno para
              asegurar su seguridad.</p>
          </div>

          {/* Contenedor para Asesoría Legal */}
          <div className="service-container">
            <GavelIcon className="icon" />
            <h3>Asesoría Legal</h3>
            <p>Nuestro equipo de abogados especializados en diferentes ramas del derecho brinda asesoría
              integral para resolver cualquier asunto legal que su empresa o persona pueda necesitar.</p>
            <p>Si desea más información sobre nuestros servicios de asesoría legal, contáctenos.</p>
          </div>

          {/* Contenedor para Investigación de Infidelidades */}
          <div className="service-container">
            <PeopleIcon className="icon" /> {/* Nuevo icono */}
            <h3>Investigación de Infidelidades</h3>
            <p>Contamos con un equipo especializado que realiza seguimientos discretos para verificar la
              fidelidad en relaciones personales. Utilizamos técnicas avanzadas de investigación.</p>
            <p>Nuestros investigadores están capacitados para ofrecer un servicio confidencial y profesional.</p>
          </div>

          {/* Contenedor para Investigación de Fraudes */}
          <div className="service-container">
            <MonetizationOnIcon className="icon" /> {/* Nuevo icono */}
            <h3>Investigación de Fraudes</h3>
            <p>Ofrecemos servicios de investigación para detectar fraudes financieros, laborales o comerciales.
              Nuestros investigadores están equipados con las herramientas necesarias para identificar y
              documentar fraudes.</p>
            <p>Con nuestros servicios, protegerá su patrimonio y asegurará la integridad de su negocio.</p>
          </div>

          {/* Contenedor para Investigación de Desapariciones */}
          <div className="service-container">
            <SearchIcon className="icon" /> {/* Nuevo icono */}
            <h3>Investigación de Desapariciones</h3>
            <p>Cuando una persona desaparece, cada minuto cuenta. Nuestros investigadores actúan rápidamente para
              recabar información y evidencias que puedan ayudar a localizar a la persona desaparecida.</p>
            <p>Brindamos apoyo emocional y profesional a las familias afectadas.</p>
          </div>

        </div>
      </section>

      <footer style={{ backgroundColor: '#000000FF', color: '#fff', textAlign: 'center', padding: '10px 0' }}>
        <Typography variant="h4">PTC</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </>
  );
};

export default Servicios;
