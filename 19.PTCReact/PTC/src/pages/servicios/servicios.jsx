import React from 'react';
import './servicios.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HowToRegIcon from '@mui/icons-material/HowToReg';

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
            <h2>Agencia de Investigación Criminal</h2>
            <p>Investigadores Privados. Investigación Especializada en:</p>
            <ul>
              <li>Cadena de custodia</li>
              <li>Investigación en extorsiones y secuestros</li>
              <li>Estudios de seguridad</li>
              <li>Investigación de infidelidades</li>
              <li>Investigación en robos empresariales</li>
              <li>Antecedentes</li>
              <li>Recuperación de vehículos</li>
            </ul>
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
        </div>
      </section>
    </>
  );
};

export default Servicios;
