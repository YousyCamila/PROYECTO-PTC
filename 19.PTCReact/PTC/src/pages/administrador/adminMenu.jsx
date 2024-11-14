import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkIcon from '@mui/icons-material/Work';
import ContractIcon from '@mui/icons-material/Description'; // Asigna un ícono a los contratos
import Swal from 'sweetalert2';

const AdminMenu = () => {
  const navigate = useNavigate();

  const handleGestionClientes = () => navigate('/gestionar-clientes');
  const handleGestionDetectives = () => navigate('/gestionar-detectives');
  const handleGestionCasos = () => navigate('/gestionar-casos');
  const handleGestionContratos = () => navigate('/gestionar-contratos');
  const handleResponderSolicitudes = () => navigate('/responder-solicitudes');

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente',
    }).then(() => navigate('/'));
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f4f6f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Botón de cerrar sesión */}
      <IconButton
        onClick={handleLogout}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: '#333',
          '&:hover': { color: '#0077b6', transform: 'scale(1.1)' },
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <LogoutIcon />
      </IconButton>

      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333', fontWeight: '700' }}>
          Panel Administrativo
        </Typography>
        <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
          {[{
              title: "Gestionar Clientes",
              description: "Agrega, edita y elimina clientes",
              icon: <GroupIcon fontSize="large" />,
              onClick: handleGestionClientes,
              color: '#0096c7',
            },
            {
              title: "Responder Solicitudes",
              description: "Revisa y responde las solicitudes de los clientes",
              icon: <SupportAgentIcon fontSize="large" />,
              onClick: handleResponderSolicitudes,
              color: '#0077b6',
            },
            {
              title: "Gestionar Detectives",
              description: "Controla y administra a los detectives",
              icon: <WorkIcon fontSize="large" />,
              onClick: handleGestionDetectives,
              color: '#005f91',
            },
            {
              title: "Gestionar Casos",
              description: "Maneja y organiza los casos asignados",
              icon: <AssignmentIcon fontSize="large" />,
              onClick: handleGestionCasos,
              color: '#003f5c',
            },
            {
              title: "Gestionar Contratos",
              description: "Administra los contratos asociados a los casos",
              icon: <ContractIcon fontSize="large" />,
              onClick: handleGestionContratos,
              color: '#002855',
            }
          ].map((menu, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 3,
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                  borderLeft: `5px solid ${menu.color}`, // Banda de color en el borde izquierdo
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 3,
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {menu.icon}
                  <Typography variant="h6" component="div" sx={{ color: '#333', fontWeight: '600', mt: 2 }}>
                    {menu.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: '#666' }}>{menu.description}</Typography>
                </CardContent>
                <CardActions sx={{ width: '100%', paddingTop: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: menu.color,
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#004080' },
                    }}
                    onClick={menu.onClick}
                  >
                    Acceder
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminMenu;
