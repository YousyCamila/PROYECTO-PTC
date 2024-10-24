import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/system';

const services = [
  {
    title: "Cadena de Custodia",
    description: "Garantizamos la preservación de la evidencia en investigaciones.",
    img: "https://via.placeholder.com/800x400.png?text=Cadena+de+Custodia",
  },
  {
    title: "Investigación de Extorsión",
    description: "Servicios especializados para combatir la extorsión.",
    img: "https://via.placeholder.com/800x400.png?text=Investigación+de+Extorsión",
  },
  {
    title: "Estudios de Seguridad",
    description: "Evaluaciones exhaustivas para garantizar su seguridad.",
    img: "https://via.placeholder.com/800x400.png?text=Estudios+de+Seguridad",
  },
  {
    title: "Investigación de Infidelidades",
    description: "Investigaciones discretas y profesionales.",
    img: "https://via.placeholder.com/800x400.png?text=Investigación+de+Infidelidades",
  },
  {
    title: "Investigación de Robos Empresariales",
    description: "Soluciones para la prevención de robos en su empresa.",
    img: "https://via.placeholder.com/800x400.png?text=Investigación+de+Robos+Empresariales",
  },
];

const reasons = [
  "25 años de experiencia en el sector.",
  "Equipo profesional y altamente capacitado.",
  "Tecnología de punta en nuestras investigaciones.",
  "Confidencialidad garantizada en todos los procesos.",
  "Resultados comprobados y casos de éxito.",
];

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#e0f7fa',
  },
}));

const Home = () => {
  return (
    <Box sx={{ width: '100%', background: 'linear-gradient(to bottom, #00b4d8, #0077b6)', color: '#fff' }}>
      <AppBar position="static" sx={{ backgroundColor: '#005f91' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PTC
          </Typography>
          <Button color="inherit" href="/login">
            Inicio de Sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Carousel>
          {services.map((service, i) => (
            <Box key={i}>
              <StyledCard sx={{ maxWidth: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  alt={service.title}
                  height="400"
                  image={service.img}
                />
                <CardContent>
                  <Typography variant="h5">{service.title}</Typography>
                  <Typography variant="body2">{service.description}</Typography>
                </CardContent>
              </StyledCard>
            </Box>
          ))}
        </Carousel>
      </Container>

      <Box sx={{ p: 4, backgroundColor: '#ffffff', color: '#000' }}>
        <Typography variant="h4" align="center">¿Quiénes Somos?</Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Agencia de investigación privada con énfasis en delitos de alto impacto, 25 años de experiencia y reconocimiento a nivel nacional e internacional. Personal capacitado, profesionales en cada área. Especialistas en criminalística y manejo de cadena de custodia. Un amplio portafolio de servicios y la garantía de dar absoluta reserva en cada proceso.
        </Typography>
      </Box>

      <Box sx={{ p: 4, backgroundColor: '#e0e0e0', color: '#000' }}>
        <Typography variant="h4" align="center">¿Por Qué Elegirnos?</Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          {reasons.map((reason, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard sx={{ textAlign: 'center', padding: 2 }}>
                <CardContent>
                  <Typography variant="h5">{`#${index + 1}`}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{reason}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <footer style={{ backgroundColor: '#005f91', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
        <Typography variant="h4">PTC</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </Box>
  );
};

export default Home;
