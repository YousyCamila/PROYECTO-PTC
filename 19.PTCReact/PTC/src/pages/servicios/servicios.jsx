import React from 'react';

import './servicios.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Servicios = () => {  
  return (
    <>
      {/* NAVBAR IGUAL QUE HOME */}
      <AppBar position="static" sx={{ backgroundColor: '#0077b6' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PTC</Typography>
          <Button color="inherit" href="/">Inicio</Button>
          <Button color="inherit" href="/servicios">Servicios</Button>
          <Button color="inherit" href="/contactanos">Contáctanos</Button>
          <Button color="inherit" href="/login">Inicio de Sesión</Button>
        </Toolbar>
      </AppBar>

      <section className="services-section">
        {/* TÍTULO CON DIVIDER */}
        <div className="services-title">
          <h1>Nuestros Servicios</h1>
          <span className="services-divider" />
        </div>

        <div className="services-content">
          {/* ───────── TARJETAS ───────── */}
          {[ 
            {
              icon: <SecurityIcon className="icon" />,
              title: 'Agencia de Investigación Criminal',
              desc: [
                'Investigadores Privados especializados en cadena de custodia, extorsiones, secuestros, estudios de seguridad, infidelidades, robos, fraudes, desapariciones y antecedentes.',
                'Asesoría legal en todas las áreas del derecho.'
              ]
            },
            {
              icon: <VerifiedUserIcon className="icon" />,
              title: 'Cadena de Custodia',
              desc: [
                'Procedimiento de control y registro que se aplica a los indicios, vestigios, evidencias, huellas, instrumentos, objetos o productos relacionados con el delito.',
                'Acompañamiento según las leyes de la constitución colombiana y el manual de cadena de custodia.'
              ]
            },
            {
              icon: <ReportProblemIcon className="icon" />,
              title: 'Extorsiones y Secuestros',
              desc: [
                'Resolvemos estos casos con un 89% de efectividad, asegurando la prevención y solución de estos crímenes.',
                'Evitar una extorsión o secuestro es posible con nuestros servicios.'
              ]
            },
            {
              icon: <SecurityIcon className="icon" />,
              title: 'Estudios de Seguridad',
              desc: [
                'Estudios de seguridad empresariales y residenciales, análisis de riesgos, rutas de evacuación y estructuración de un cordón de seguridad.',
                'Nuestro personal define y estudia cada riesgo en su entorno.'
              ]
            },
            {
              icon: <GavelIcon className="icon" />,
              title: 'Asesoría Legal',
              desc: [
                'Equipo de abogados especializados brinda asesoría integral en diferentes ramas del derecho.',
                'Si desea más información sobre nuestros servicios de asesoría legal, contáctenos.'
              ]
            },
            {
              icon: <PeopleIcon className="icon" />,
              title: 'Investigación de Infidelidades',
              desc: [
                'Seguimientos discretos para verificar la fidelidad en relaciones personales mediante técnicas avanzadas de investigación.',
                'Servicio confidencial y profesional.'
              ]
            },
            {
              icon: <MonetizationOnIcon className="icon" />,
              title: 'Investigación de Fraudes',
              desc: [
                'Detección de fraudes financieros, laborales o comerciales con herramientas de vanguardia.',
                'Proteja su patrimonio y la integridad de su negocio.'
              ]
            },
            {
              icon: <SearchIcon className="icon" />,
              title: 'Investigación de Desapariciones',
              desc: [
                'Actuamos rápidamente para recabar evidencias que ayuden a localizar personas desaparecidas.',
                'Brindamos apoyo emocional y profesional a las familias afectadas.'
              ]
            }
          ].map(({ icon, title, desc }, i) => (
            <div className="service-container fade-in" key={title}>
              {icon}
              <h3>{title}</h3>
              {desc.map((d) => <p key={d}>{d}</p>)}
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor: '#0077b6',
                  '&:hover': { backgroundColor: '#005b96' },
                }}
                href={`/contactanos?servicio=${title}`} // Redirige a Contactanos con el servicio como parámetro
              >
                Solicitar
              </Button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
        <Typography variant="h4">PTC</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </>
  );
};

export default Servicios;
