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
  IconButton,
  useTheme,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import NavbarSidebar from '../NavbarSidebar';

const DetallesCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch cliente details from the API
  const fetchCliente = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
      const data = await response.json();

      if (response.ok) {
        setCliente(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching cliente:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información del cliente.',
      });
    }
  };

  useEffect(() => {
    fetchCliente();
  }, [id]);

  const handleBack = () => {
    navigate('/gestionar-clientes');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#0077b6',
      },
      secondary: {
        main: '#00bcd4',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: darkMode ? '0px 4px 20px rgba(0, 0, 0, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  if (!cliente) return <div>Cargando...</div>;

  // Verificar que los arreglos existan y sean válidos
  const casos = Array.isArray(cliente.casos) ? cliente.casos : [];
  const historialCasos = Array.isArray(cliente.historialCasos) ? cliente.historialCasos : [];
  const contratos = Array.isArray(cliente.contratos) ? cliente.contratos : [];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: darkMode ? '#121212' : 'linear-gradient(to right, #001f3f, #0077b6)',
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
                Detalles del Cliente
              </Typography>
              <IconButton onClick={toggleDarkMode} color="primary">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
              <Tab label="Información Personal" />
              <Tab label="Detalles Adicionales" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>
                      Información Personal
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>ID:</strong> {cliente._id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Nombres:</strong> {cliente.nombres}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Apellidos:</strong> {cliente.apellidos}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Correo:</strong> {cliente.correo}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Tipo de Documento:</strong> {cliente.tipoDocumento}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Número de Documento:</strong> {cliente.numeroDocumento}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Fecha de Nacimiento:</strong>{' '}
                      {new Date(cliente.fechaNacimiento).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Estado:</strong> {cliente.activo ? 'Activo' : 'Inactivo'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Casos ({casos.length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {casos.length > 0 ? (
                        casos.map((caso, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={caso.nombre} />
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2">No hay casos asociados.</Typography>
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Historial de Casos ({historialCasos.length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {historialCasos.length > 0 ? (
                        historialCasos.map((historial, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={historial.nombre} />
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2">No hay historial de casos.</Typography>
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Contratos ({contratos.length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {contratos.length > 0 ? (
                        contratos.map((contrato, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={contrato.nombre} />
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2">No hay contratos asociados.</Typography>
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
                Volver a la Gestión de Clientes
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DetallesCliente;
``
