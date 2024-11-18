
import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'; // Icono para el botón interactivo
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';




const AdminMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si no hay usuario o el rol no es "administrador", no renderizamos el menú
  if (!user || user.role !== 'administrador') {
    return <Typography variant="h6" color="error">Acceso denegado. Solo administradores pueden acceder a este menú.</Typography>;
  }

  const handleGestionClientes = () => {
    navigate('/gestionar-clientes');
  };

  const handleGestionDetectives = () => {
    navigate('/gestionar-detectives');
  };

  const handleGestionCasos = () => {
    navigate('/gestionar-casos');
  };

  const handleGestionContratos = () => {
    navigate('/gestionar-contratos'); // Navegar a la gestión de contratos
  };
  
  const handleResponderSolicitudes = () => {
    navigate('/responder-solicitudes'); // Navegar a la página de responder solicitudes
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

        <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
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

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: '#f0f4f8',
                '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#0077b6' }}>
                  Responder Solicitudes
                </Typography>
                <Typography sx={{ mt: 2 }}>Revisa y responde las solicitudes de los clientes</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
                  onClick={handleResponderSolicitudes}
                >
                  Ir a Responder Solicitudes
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
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

          <Grid item xs={12} sm={6} md={3}>
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

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: '#f0f4f8',
                '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#0077b6' }}>
                  Gestionar Contratos
                </Typography>
                <Typography sx={{ mt: 2 }}>Administra los contratos asociados a los casos</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
                  onClick={handleGestionContratos}
                >
                  Ir a Gestión de Contratos
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
