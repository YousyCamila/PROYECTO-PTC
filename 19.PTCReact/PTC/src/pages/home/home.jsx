import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  LinearProgress,
  Container,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { FaShieldAlt } from "react-icons/fa";
import "./Home.css";


/* ================= COMPONENTES AUXILIARES ================= */
const AnimatedProgressBar = ({ value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => Math.min(old + value / 30, value));
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="progress-container">
      <Typography variant="h6" className="progress-value">{`${Math.round(progress)}%`}</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#0077b6",
          },
        }}
      />
    </div>
  );
};

/* ==================== HOME ==================== */
const Home = () => {
  /* ---- carrusel de mensajes de bienvenida ---- */
  const messages = [
    "¡Bienvenidos a PTC!",
    "Tu seguridad, nuestra prioridad",
    "25 años de experiencia a tu servicio",
    "Confidencialidad y resultados óptimos",
  ];
  const [index, setIndex] = useState(0);
  const current = messages[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* ---------- NAVBAR ---------- */}
      <AppBar position="fixed" sx={{ backgroundColor: "#0077b6" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PTC
          </Typography>
          <Button color="inherit" href="/servicios">Servicios</Button>
          <Button color="inherit" href="/contactanos">Contáctanos</Button>
          <Button color="inherit" href="/login">Inicio de Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* ---------- WELCOME ---------- */}
      <Box className="welcome-section">
        <FaShieldAlt className="welcome-icon" />
        <Typography variant="h3" className="welcome-carousel">
          {current}
        </Typography>
      </Box>

      {/* ---------- QUIÉNES SOMOS ---------- */}
      <Container className="section quienes-somos">
        <Typography variant="h4" className="section-title">¿Quiénes Somos?</Typography>
        <div className="section-divider" />
        <Typography variant="body1" className="section-description">
          Somos una agencia de investigación privada con 25 años de experiencia en delitos de alto impacto. Ofrecemos servicios
          con altos estándares de confidencialidad, profesionalismo y eficacia.
        </Typography>
        <Grid container spacing={4} className="progress-grid">
          {[
            { v: 75, t: "Crímenes resueltos con efectividad en tiempo récord." },
            { v: 100, t: "Asesorías legales por abogados especializados." },
            { v: 98, t: "Investigaciones con resultados óptimos." },
          ].map(({ v, t }) => (
            <Grid item xs={12} md={4} key={t}>
              <Paper className="progress-card fade-in">
                <AnimatedProgressBar value={v} />
                <Typography className="progress-text">{t}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ---------- PILARES ---------- */}
      <Container className="section pilares">
        <Typography variant="h4" className="section-title">Nuestros Pilares</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper className="pillar-card">
              <SecurityIcon className="pillar-icon" />
              <Typography variant="h6">Experiencia</Typography>
              <Typography>Más de dos décadas resolviendo casos complejos y delicados.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="pillar-card">
              <GroupIcon className="pillar-icon" />
              <Typography variant="h6">Profesionales</Typography>
              <Typography>Equipo de expertos en investigación, derecho y criminología.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="pillar-card">
              <TrendingUpIcon className="pillar-icon" />
              <Typography variant="h6">Resultados</Typography>
              <Typography>Altas tasas de éxito en cada investigación realizada.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ---------- FAQ ---------- */}
      <Container className="section faqs">
        <Typography variant="h4" className="section-title">Preguntas Frecuentes</Typography>
        {[
          {
            q: "¿Cómo podemos contactarlos?",
            a: "Puedes contactarnos a través de la sección Contáctanos, donde encontrarás un formulario de contacto, números telefónicos y otros medios para comunicarte con nosotros.",
          },
          {
            q: "¿La información es confidencial?",
            a: "Totalmente. Garantizamos absoluta confidencialidad y seguridad en cada caso.",
          },
          {
            q: "¿Tienen cobertura nacional?",
            a: "Sí, contamos con cobertura en todo el territorio nacional.",
          },
        ].map(({ q, a }) => (
          <Accordion key={q}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}> <Typography>{q}</Typography> </AccordionSummary>
            <AccordionDetails> <Typography>{a}</Typography> </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </div>
  );
};

export default Home;
