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
    img: "https://www.precintia.com/wp-content/uploads/2020/09/cadena-custodia-precintia.jpg",
  },
  {
    title: "Investigación de Extorsión",
    description: "Servicios especializados para combatir la extorsión.",
    img: "https://keepcoding.io/wp-content/uploads/2024/06/extorsion-en-ciberseguridad-que-es.jpg",
  },
  {
    title: "Estudios de Seguridad",
    description: "Evaluaciones exhaustivas para garantizar su seguridad.",
    img: "https://www.asis.org.pe/media/k2/items/cache/85b62d4a27ea43297eb1ab349b6e06c6_XL.jpg",
  },
  {
    title: "Investigación de Infidelidades",
    description: "Investigaciones discretas y profesionales.",
    img: "https://www.ctxdetectives.com/wp-content/uploads/2018/01/detective-infidelidades.jpg",
  },
  {
    title: "Investigación de Robos Empresariales",
    description: "Soluciones para la prevención de robos en su empresa.",
    img: "https://investigacioncriminal.es/wp-content/uploads/2023/02/auditoria.jpg",
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
    backgroundColor: '#FFFFFFE0',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  borderRadius: '16px 16px 0 0', // Bordes redondeados en la parte superior
  height: '400px',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: 'transparent', // Fondo transparente
  borderRadius: '0 0 16px 16px', // Bordes redondeados en la parte inferior
  position: 'relative',
  zIndex: 1, // Asegura que el contenido esté por encima de la imagen
  padding: theme.spacing(2),
}));

const Home = () => {
  return (
    <Box sx={{ width: '100%', background: 'linear-gradient(to bottom, #000000FF, #0056E0FF)', color: '#fff' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(to left, rgba(12, 94, 218, 0.298), rgba(0, 0, 0, 0.911), rgba(12, 94, 218, 0.298))' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PTC
          </Typography>
          <Button color="inherit" href="/servicios">
            Servicios
          </Button>
          <Button color="inherit" href="/contactanos">
            Contáctanos
          </Button>
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
                <StyledCardMedia
                  component="img"
                  alt={service.title}
                  image={service.img}
                />
                <StyledCardContent>
                  <Typography variant="h5" align="center">{service.title}</Typography>
                  <Typography variant="body2" align="center">{service.description}</Typography>
                </StyledCardContent>
              </StyledCard>
            </Box>
          ))}
        </Carousel>
      </Container>

      <Box sx={{ p: 12, backgroundColor: '#ffffff', color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>¿Quiénes Somos?</Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2, fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '800px' }}>
          Agencia de investigación privada con énfasis en delitos de alto impacto, 25 años de experiencia y reconocimiento a nivel nacional e internacional. Personal capacitado, profesionales en cada área. Especialistas en criminalística y manejo de cadena de custodia. Un amplio portafolio de servicios y la garantía de dar absoluta reserva en cada proceso.
        </Typography>
      </Box>

      <Box sx={{ p: 4, backgroundColor: '#EBECECFF', color: '#000' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>¿Por Qué Elegirnos?</Typography>
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

      <footer style={{ backgroundColor: '#000000FF', color: '#fff', textAlign: 'center', padding: '5px 0' }}>
        <Typography variant="h5">PTC</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </Box>
  );
};

export default Home;
