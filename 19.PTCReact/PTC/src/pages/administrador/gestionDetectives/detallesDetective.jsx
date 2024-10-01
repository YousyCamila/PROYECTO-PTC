import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DetallesDetective = () => {
  const { id } = useParams(); // Obtener el ID del detective de la URL
  const [detective, setDetective] = useState(null);
  const navigate = useNavigate();

  // Fetch detective details from the API
  const fetchDetective = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/detectives/${id}`);
      const data = await response.json();

      if (response.ok) {
        setDetective(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching detective:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información del detective.',
      });
    }
  };

  useEffect(() => {
    fetchDetective();
  }, [id]);

  const handleBack = () => {
    navigate('/gestionar-detectives'); // Navegar a la lista de detectives
  };

  if (!detective) return <div>Cargando...</div>; // Mostrar un mensaje de carga si no se ha cargado el detective

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
            Detalles del Detective
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Información Personal</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>ID:</strong> {detective._id}</Typography> {/* Mostrar ID del detective */}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Nombres:</strong> {detective.nombres}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Apellidos:</strong> {detective.apellidos}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Correo:</strong> {detective.correo}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Tipo de Documento:</strong> {detective.tipoDocumento}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Número de Documento:</strong> {detective.numeroDocumento}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {new Date(detective.fechaNacimiento).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Estado:</strong> {detective.activo ? 'Activo' : 'Inactivo'}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Información Adicional</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Casos:</strong> {detective.casos.length} casos</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Historial de Casos:</strong> {detective.historialCasos.length} historial</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Contratos:</strong> {detective.contratos.length} contratos</Typography>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ color: '#0077b6', borderColor: '#0077b6', '&:hover': { backgroundColor: '#e0e0e0' } }}>
              Volver a la Gestión de Detectives
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DetallesDetective;
