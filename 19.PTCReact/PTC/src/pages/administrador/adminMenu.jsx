import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== 'administrador') {
    return <Typography variant="h6" color="error">Acceso denegado. Solo administradores pueden acceder a este menú.</Typography>;
  }

  const handleNavigation = (route) => {
    navigate(route);
    setSidebarOpen(false); // Cerrar el sidebar al seleccionar una opción
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente',
    }).then(() => {
      navigate('/');
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
      {/* Botón de menú (sidebar) */}
      <IconButton
        onClick={() => setSidebarOpen(true)}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#0077b6',
          color: 'white',
          '&:hover': {
            backgroundColor: '#005f91',
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Botones de acciones (parte superior derecha) */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Botón de "Responder Solicitudes" */}
        <Button
          onClick={() => navigate('/responder-solicitudes')}
          sx={{
            backgroundColor: '#0077b6',
            color: 'white',
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              backgroundColor: '#005f91',
            },
          }}
        >
          <AssignmentTurnedInIcon />
          Responder Solicitudes
        </Button>

        {/* Botón de subir imagen */}
        <IconButton>
          <Avatar
            sx={{
              backgroundColor: '#fff',
              color: '#0077b6',
              border: '1px solid #0077b6',
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: '#f0f8ff',
              }
            }
            }
            src="https://icones.pro/wp-content/uploads/2021/02/symbole-masculin-icone-l-utilisateur-gris.png" // Imagen predefinida
            alt="Imagen"
          />
        </IconButton>
      </Box>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#000',
            color: 'white',
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#0077b6',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: 'white' }}>
            PTC
          </Typography>
        </Box>
        <List sx={{ mt: 2 }}>
          {[
            { text: 'Gestionar Clientes', route: '/gestionar-clientes', icon: <GroupIcon /> },
            { text: 'Gestionar Detectives', route: '/gestionar-detectives', icon: <AssignmentIcon /> },
            { text: 'Gestionar Casos', route: '/gestionar-casos', icon: <FolderSpecialIcon /> },
            { text: 'Gestionar Contratos', route: '/gestionar-contratos', icon: <ArticleIcon /> },
          ].map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.route)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#0077b6',
                    color: 'white',
                  },
                  padding: '10px 20px',
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ backgroundColor: '#444' }} />
        <Button
          onClick={handleLogout}
          sx={{
            margin: 2,
            backgroundColor: '#ff5e57',
            color: 'white',
            '&:hover': {
              backgroundColor: '#ff2e20',
            },
            display: 'block',
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} /> Cerrar Sesión
        </Button>

      </Drawer>

      {/* Contenido principal */}
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
          {[
            { title: 'Gestionar Clientes', description: 'Agrega, edita y elimina clientes', onClick: () => handleNavigation('/gestionar-clientes') },
            { title: 'Gestionar Detectives', description: 'Administra a los detectives', onClick: () => handleNavigation('/gestionar-detectives') },
            { title: 'Gestionar Casos', description: 'Maneja y organiza los casos', onClick: () => handleNavigation('/gestionar-casos') },
            { title: 'Gestionar Contratos', description: 'Administra los contratos', onClick: () => handleNavigation('/gestionar-contratos') },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: '#f0f4f8',
                  '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ color: '#0077b6' }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
                    onClick={card.onClick}
                  >
                    Ir
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
