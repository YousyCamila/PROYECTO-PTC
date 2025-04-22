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
import { FaShieldAlt } from 'react-icons/fa';
import "./Home.css";

const AnimatedProgressBar = ({ value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = value / 30;
        return Math.min(oldProgress + diff, value);
      });
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

const Home = () => {
  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: "#0077b6" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PTC
          </Typography>
          <Button color="inherit" href="/servicios">Servicios</Button>
          <Button color="inherit" href="/contactanos">Contáctanos</Button>
          <Button color="inherit" href="/login">Inicio de Sesión</Button>
        </Toolbar>
      </AppBar>

      <Box className="welcome-section">
      <FaShieldAlt className="welcome-icon" />
  <Typography variant="h3" className="welcome-title">¡Bienvenidos a PTC!</Typography>
  <Typography variant="subtitle1" className="welcome-subtitle">Tu seguridad, nuestra prioridad</Typography>
  <div className="welcome-animation" />
</Box>

      <Container className="section quienes-somos">
        <Typography variant="h4" className="section-title">¿Quiénes Somos?</Typography>
        <Typography variant="body1" className="section-description">
          Somos una agencia de investigación privada con 25 años de experiencia en delitos de alto impacto. Ofrecemos servicios
          con altos estándares de confidencialidad, profesionalismo y eficacia.
        </Typography>
        <Grid container spacing={4} className="progress-grid">
          <Grid item xs={12} md={4}>
            <Paper className="progress-card">
              <AnimatedProgressBar value={75} />
              <Typography className="progress-text">Crímenes resueltos con efectividad en tiempo récord.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="progress-card">
              <AnimatedProgressBar value={100} />
              <Typography className="progress-text">Asesorías legales por abogados especializados.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="progress-card">
              <AnimatedProgressBar value={98} />
              <Typography className="progress-text">Investigaciones con resultados óptimos.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

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

      <Container className="section faqs">
        <Typography variant="h4" className="section-title">Preguntas Frecuentes</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>¿Qué tipo de servicios ofrecen?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Ofrecemos investigaciones privadas, asesorías legales, protección personal, y más.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>¿La información es confidencial?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Totalmente. Garantizamos absoluta confidencialidad y seguridad en cada caso.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>¿Tienen cobertura nacional?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Sí, contamos con cobertura en todo el territorio nacional.</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
};

export default Home;
