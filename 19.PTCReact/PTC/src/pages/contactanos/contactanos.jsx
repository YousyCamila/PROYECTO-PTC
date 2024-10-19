import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/system';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    numeroCelular: '',
    descripcion: '',
    correoCliente: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/formularios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSnackbarMessage('Formulario enviado exitosamente');
        setSnackbarOpen(true);
        setFormData({
          nombre: '',
          numeroCelular: '',
          descripcion: '',
          correoCliente: '',
        });
      } else {
        setSnackbarMessage('Error al enviar el formulario');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Error en la conexión');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%', background: '#f5f5f5', p: 4 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1A1C1EFF' }}>
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
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Contáctanos
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                required
                value={formData.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número Celular"
                name="numeroCelular"
                type="text"
                fullWidth
                required
                value={formData.numeroCelular}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo Electrónico"
                name="correoCliente"
                type="email"
                fullWidth
                required
                value={formData.correoCliente}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                fullWidth
                required
                multiline
                rows={4}
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </form>
      </Container>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      <footer style={{ backgroundColor: '#000000FF', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
        <Typography variant="h4">PTC</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </Box>
  );
};

export default Contactanos;
