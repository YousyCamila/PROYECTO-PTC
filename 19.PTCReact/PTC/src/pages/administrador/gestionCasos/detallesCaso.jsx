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
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DetallesCaso = () => {
  const { id } = useParams(); // Obtener el ID del caso de la URL
  const [caso, setCaso] = useState(null);
  const navigate = useNavigate();

  // Fetch caso details from the API
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
    navigate('/gestionar-casos'); // Navegar a la lista de casos
  };

  if (!caso) return <div>Cargando...</div>; // Mostrar un mensaje de carga si no se ha cargado el caso

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #001f3f, #0077b6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
            Detalles del Caso
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Información del Caso</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>ID del Caso:</strong> {caso._id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Nombre del Caso:</strong> {caso.nombreCaso}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Cliente:</strong> {caso.idCliente.nombres} {caso.idCliente.apellidos}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Detective:</strong> {caso.idDetective ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}` : 'No asignado'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Estado:</strong> {caso.activo ? 'Activo' : 'Inactivo'}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Detalles Adicionales</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Evidencias:</strong></Typography>
              <List>
                {caso.evidencias.length > 0 ? (
                  caso.evidencias.map((evidencia, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Evidencia ID: ${evidencia}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2">No hay evidencias asociadas.</Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Registro de Casos:</strong></Typography>
              <List>
                {caso.registroCasos.length > 0 ? (
                  caso.registroCasos.map((registro, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Registro ID: ${registro}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2">No hay registros de casos asociados.</Typography>
                )}
              </List>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ color: '#0077b6', borderColor: '#0077b6', '&:hover': { backgroundColor: '#e0e0e0' } }}>
              Volver a la Gestión de Casos
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DetallesCaso;
