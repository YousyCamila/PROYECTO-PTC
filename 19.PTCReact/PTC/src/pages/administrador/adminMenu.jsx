import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'; // Icono para el botón interactivo
import Swal from 'sweetalert2';

const AdminMenu = () => {
  const navigate = useNavigate();

  const handleGestionClientes = () => {
    navigate('/gestionar-clientes');
  };

  const handleGestionDetectives = () => {
    navigate('/gestionar-detectives');
  };

  const handleGestionCasos = () => {
    navigate('/gestion-casos');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente',
    }).then(() => {
      navigate('/'); // Redirigir al home
    });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #0077b6, #00b4d8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Botón de cerrar sesión en la parte superior derecha */}
      <IconButton
        onClick={handleLogout}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: '#ff5e57',
          color: 'white',
          '&:hover': {
            backgroundColor: '#ff2e20',
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <LogoutIcon />
      </IconButton>

      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#0077b6' }}>
          Menú Administrativo
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: '#f0f4f8',
                '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#0077b6' }}>
                  Gestionar Clientes
                </Typography>
                <Typography sx={{ mt: 2 }}>Agrega, edita y elimina clientes</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
                  onClick={handleGestionClientes}
                >
                  Ir a Gestión de Clientes
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: '#f0f4f8',
                '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#0077b6' }}>
                  Gestionar Detectives
                </Typography>
                <Typography sx={{ mt: 2 }}>Controla y administra a los detectives</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
                  onClick={handleGestionDetectives}
                >
                  Ir a Gestión de Detectives
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: '#f0f4f8',
                '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#0077b6' }}>
                  Gestionar Casos
                </Typography>
                <Typography sx={{ mt: 2 }}>Maneja y organiza los casos asignados</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
                  onClick={handleGestionCasos}
                >
                  Ir a Gestión de Casos
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminMenu;
