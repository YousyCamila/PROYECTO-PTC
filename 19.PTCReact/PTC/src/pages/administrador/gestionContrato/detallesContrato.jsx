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

const DetallesContrato = () => {
  const { id } = useParams(); // Obtener el ID del contrato de la URL
  const [contrato, setContrato] = useState(null);
  const navigate = useNavigate();

  // Fetch contrato details from the API
  const fetchContrato = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/contratos/${id}`);
      const data = await response.json();

      if (response.ok) {
        setContrato(data);
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

  useEffect(() => {
    fetchContrato();
  }, [id]);

  const handleBack = () => {
    navigate('/gestionar-contratos'); // Navegar a la lista de contratos
  };

  if (!contrato) return <div>Cargando...</div>; // Mostrar un mensaje de carga si no se ha cargado el contrato

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
            Detalles del Contrato
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Información del Contrato</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Descripción del Servicio:</strong> {contrato.descripcionServicio}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Tarifa:</strong> ${contrato.tarifa ? parseFloat(contrato.tarifa.toString()).toFixed(2) : 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Estado:</strong> {contrato.estado ? 'Activo' : 'Inactivo'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Fecha de Inicio:</strong> {new Date(contrato.fechaInicio).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Fecha de Cierre:</strong> {new Date(contrato.fechaCierre).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Button variant="outlined" onClick={handleBack} sx={{ color: '#0077b6', borderColor: '#0077b6', '&:hover': { backgroundColor: '#e0e0e0' } }}>
            Volver a la Gestión de Contratos
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default DetallesContrato;
