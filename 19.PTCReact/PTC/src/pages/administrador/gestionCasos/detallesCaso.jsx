import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  createTheme,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import NavbarSidebar from '../NavbarSidebar';

const DetallesCaso = () => {
  const { id } = useParams();
  const [caso, setCaso] = useState(null);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const fetchCaso = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/caso/${id}`);
      const data = await response.json();

      if (response.ok) {
        setCaso(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching caso:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información del caso.',
      });
    }
  };

  useEffect(() => {
    fetchCaso();
  }, [id]);

  const handleBack = () => {
    navigate('/gestionar-casos');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#0077b6' },
      secondary: { main: '#00bcd4' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: darkMode
              ? '0px 4px 20px rgba(0, 0, 0, 0.2)'
              : '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  if (!caso) return <div>Cargando...</div>;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: darkMode
            ? '#121212'
            : 'linear-gradient(to right, #001f3f, #0077b6)',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 15,
          flexDirection: 'column',
        }}
      >
        <NavbarSidebar />
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Paper sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#0077b6' }}>
                Detalles del Caso
              </Typography>
              <IconButton onClick={toggleDarkMode} color="primary">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
              <Tab label="Información General" />
              <Tab label="Detalles Adicionales" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>ID del Caso:</strong> {caso._id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Nombre:</strong> {caso.nombreCaso}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Cliente:</strong> {caso.idCliente.nombres} {caso.idCliente.apellidos}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Detective:</strong>{caso.idDetective.nombres} {caso.idDetective.apellidos}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Estado:</strong> {caso.activo ? 'Activo' : 'Inactivo'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Evidencias ({caso.evidencias.length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {caso.evidencias.length > 0 ? (
                        caso.evidencias.map((evidencia, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={evidencia.nombre} />
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2">No hay evidencias asociadas.</Typography>
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  color: '#0077b6',
                  borderColor: '#0077b6',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                Volver a la Gestión de Casos
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DetallesCaso;
