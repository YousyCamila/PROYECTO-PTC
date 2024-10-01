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

const DetallesCliente = () => {
  const { id } = useParams(); // Obtener el ID del cliente de la URL
  const [cliente, setCliente] = useState(null);
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
    navigate('/gestionar-clientes'); // Navegar a la lista de clientes
  };

  if (!cliente) return <div>Cargando...</div>; // Mostrar un mensaje de carga si no se ha cargado el cliente

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
            Detalles del Cliente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Información Personal</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Nombres:</strong> {cliente.nombres}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Apellidos:</strong> {cliente.apellidos}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Correo:</strong> {cliente.correo}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Tipo de Documento:</strong> {cliente.tipoDocumento}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Número de Documento:</strong> {cliente.numeroDocumento}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {new Date(cliente.fechaNacimiento).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Estado:</strong> {cliente.activo ? 'Activo' : 'Inactivo'}</Typography>
            </Grid>
          </Grid>

          {/* Sección para los detalles adicionales */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>Detalles Adicionales</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Casos:</strong></Typography>
              <List>
                {cliente.casos.length > 0 ? (
                  cliente.casos.map((caso, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Caso ID: ${caso.id}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2">No hay casos asociados.</Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Contratos:</strong></Typography>
              <List>
                {cliente.contratos.length > 0 ? (
                  cliente.contratos.map((contrato, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Contrato ID: ${contrato.id}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2">No hay contratos asociados.</Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Facturas:</strong></Typography>
              <List>
                {cliente.facturas.length > 0 ? (
                  cliente.facturas.map((factura, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Factura ID: ${factura.id}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2">No hay facturas asociadas.</Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Historiales:</strong></Typography>
              <List>
                {cliente.historials.length > 0 ? (
                  cliente.historials.map((historial, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Historial ID: ${historial.id}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2">No hay historiales asociados.</Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Registro de Casos:</strong></Typography>
              <List>
                {cliente.registroCaso.length > 0 ? (
                  cliente.registroCaso.map((registro, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`Registro ID: ${registro.id}`} />
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
              Volver a la Gestión de Clientes
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DetallesCliente;
