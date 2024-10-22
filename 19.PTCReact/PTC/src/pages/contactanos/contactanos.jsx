import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correoCliente: '',
    numeroCelular: '',
    descripcion: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const validarNumeroCelular = (numero) => /^[0-9]{10}$/.test(numero);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCorreo(formData.correoCliente)) {
      return Swal.fire('Error', 'El correo no tiene un formato válido.', 'error');
    }

    if (!validarNumeroCelular(formData.numeroCelular)) {
      return Swal.fire('Error', 'El número de celular debe tener 10 dígitos y solo contener números.', 'error');
    }

    try {
      const response = await fetch('http://localhost:3000/api/formularios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire('Formulario Enviado', 'Tu mensaje ha sido enviado correctamente.', 'success').then(() => {
          navigate('/');
        });
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.message || 'No se pudo enviar el formulario.', 'error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire('Error', 'Ocurrió un error inesperado. Inténtalo más tarde.', 'error');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#1A1C1EFF' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PTC</Typography>
          <Button color="inherit" href="/">Inicio</Button>
          <Button color="inherit" href="/servicios">Servicios</Button>
          <Button color="inherit" href="/contactanos">Contáctanos</Button>
          <Button color="inherit" href="/login">Inicio de Sesión</Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          background: 'linear-gradient(to right, #0077b6, #00b4d8)',
          justifyContent: 'space-between',
          padding: 4,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#0077b6' }}>
            Contáctanos
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="correoCliente"
                  type="email"
                  value={formData.correoCliente}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número Celular"
                  name="numeroCelular"
                  type="tel"
                  value={formData.numeroCelular}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  multiline
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            >
              Enviar
            </Button>
          </form>
        </Container>

        <Box
          sx={{
            flexGrow: 1,
            padding: 4,
            color: '#fff',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 2,
            marginLeft: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>Instrucciones:</Typography>
          <Typography variant="body1">
            Por favor, complete el formulario con sus datos. Nos pondremos en contacto con usted lo antes posible.
          </Typography>
        </Box>
      </Box>

      <footer style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
        <Typography variant="h4">PTC</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </Box>
  );
};

export default Contactanos;
