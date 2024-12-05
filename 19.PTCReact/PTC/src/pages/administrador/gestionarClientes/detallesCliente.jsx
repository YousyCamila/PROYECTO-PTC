import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarSidebar from '../NavbarSidebar'; // Importa tu NavbarSidebar

const DetallesCliente = () => {
  const { id } = useParams(); // Obtener el ID del cliente de la URL
  const [cliente, setCliente] = useState(null);
  const [tabValue, setTabValue] = useState(0); // Para manejar las pestañas
  const navigate = useNavigate();

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
      console.error('Error fetching cliente:', error);
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
    navigate('/gestionar-clientes'); // Navegar a la lista de clientes
  };

  if (!cliente) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    ); // Mostrar un indicador de carga si no se ha cargado el cliente
  }

  // Función para obtener el nombre o descripcionServicio, si es que existen
  const obtenerDescripcion = (items, tipo) => {
    return items.map((item, index) => {
      if (tipo === 'caso') {
        return item.nombre || 'Nombre de caso no disponible';
      } else if (tipo === 'contrato') {
        return item.descripcionServicio || 'Descripción de contrato no disponible';
      } else {
        return 'Información no disponible';
      }
    });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #001f3f, #0077b6)',
        display: 'flex',
        flexDirection: 'column', // Cambié la dirección de los elementos
      }}
    >
      <NavbarSidebar /> {/* Aquí es donde se coloca el navbar arriba */}

      <Container maxWidth="lg" sx={{ marginTop: 4 }}> {/* Agregado margen superior */}
        <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center', color: '#0077b6' }}
          >
            Detalles del Cliente
          </Typography>

          {/* Pestañas para organizar la información */}
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
            <Tab label="Información Personal" />
            <Tab label="Detalles Adicionales" />
          </Tabs>

          {/* Contenido de las Pestañas */}
          {tabValue === 0 && (
            <Box>
              {/* Información Personal */}
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
              {/* Detalles Adicionales */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Casos ({cliente.casos.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {cliente.casos.length > 0 ? (
                      obtenerDescripcion(cliente.casos, 'caso').map((descripcion, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={descripcion} />
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
                  <Typography>Contratos ({cliente.contratos.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {cliente.contratos.length > 0 ? (
                      obtenerDescripcion(cliente.contratos, 'contrato').map((descripcion, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={descripcion} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2">No hay contratos asociados.</Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Facturas ({cliente.facturas.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {cliente.facturas.length > 0 ? (
                      obtenerDescripcion(cliente.facturas).map((descripcion, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={descripcion} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2">No hay facturas asociadas.</Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {/* Botón para volver */}
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
  );
};

export default DetallesCliente;
