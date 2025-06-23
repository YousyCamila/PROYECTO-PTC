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
  Button,
  IconButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import NavbarSidebar from '../NavbarSidebar';

const DetallesContrato = () => {
  const { id } = useParams();
  const [contrato, setContrato] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [detective, setDetective] = useState(null);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const fetchContrato = async () => {
    try {
      const response = await fetch(`https://proyecto-ptc.onrender.com/api/contratos/${id}`);
      const data = await response.json();

      if (response.ok) {
        setContrato(data);

        // Verifica si 'idCliente' y 'idDetective' tienen un campo '_id'
        fetchCliente(data.idCliente._id); // Pasa solo el ID como string
        fetchDetective(data.idDetective._id); // Pasa solo el ID como string
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching contrato:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información del contrato.',
      });
    }
  };

  const fetchCliente = async (idCliente) => {
    try {
      const response = await fetch(`https://proyecto-ptc.onrender.com/api/clientes/${idCliente}`);
      const data = await response.json();

      if (response.ok) {
        setCliente(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching cliente:", error);
    }
  };

  const fetchDetective = async (idDetective) => {
    try {
      const response = await fetch(`https://proyecto-ptc.onrender.com/api/detectives/${idDetective}`);
      const data = await response.json();

      if (response.ok) {
        setDetective(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching detective:", error);
    }
  };



  useEffect(() => {
    fetchContrato();
  }, [id]);

  const handleBack = () => {
    navigate('/gestionar-contratos');
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

  if (!contrato || !cliente || !detective) return <div>Cargando...</div>;

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
                Detalles del Contrato
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
                      <strong>Descripción del Servicio:</strong> {contrato.descripcionServicio}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                    <strong>Tarifa:</strong> ${Number(contrato.tarifa).toFixed(2)}

                    </Typography>


                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Estado:</strong> {contrato.estado ? 'Activo' : 'Inactivo'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Fecha de Inicio:</strong> {new Date(contrato.fechaInicio).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Fecha de Cierre:</strong> {new Date(contrato.fechaCierre).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Cliente:</strong> {cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'Cargando...'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Detective:</strong> {detective ? `${detective.nombres} ${detective.apellidos}` : 'Cargando...'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}


            {tabValue === 1 && (
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Historial de Pagos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {contrato.pagos?.length > 0 ? (
                      contrato.pagos.map((pago, index) => (
                        <Typography key={index} variant="body2">
                          {pago.fecha}: ${pago.monto?.toFixed(2)}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">No hay pagos registrados.</Typography>
                    )}
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
                Volver a la Gestión de Contratos
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DetallesContrato;
