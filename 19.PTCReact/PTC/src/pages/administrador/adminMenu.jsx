import React, { useState, useEffect } from 'react';
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
  Menu,
  MenuItem,
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import InboxIcon from '@mui/icons-material/Inbox';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart,CartesianGrid,XAxis,ResponsiveContainer,YAxis,Line,BarChart,Bar } from 'recharts';
import { CircularProgress } from '@mui/material'; // Agrega esta línea





const AdminMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [casos, setCasos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  // Si el usuario no es administrador, muestra un mensaje de acceso denegado
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

  // Manejo de apertura y cierre del menú del avatar
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  useEffect(() => {
    fetch('http://localhost:3000/api/caso')
      .then((response) => response.json())
      .then((data) => {
        setCasos(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error al cargar los casos:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => console.error('Error al cargar los clientes:', error));
  }, []);

  
  const especialidades = [
    'Investigación Penal y Criminal',
    'Cadena de Custodia y Evidencias',
    'Extorsiones y Secuestros',
    'Seguridad Residencial y Empresarial',
    'Asesoría Legal',
    'Infidelidades',
    'Fraudes Financieros y Comerciales',
    'Desapariciones',
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/detectives');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
  
        const detectives = await response.json();
  
        // Filtrar y contar detectives por especialidad
        const conteoEspecialidades = especialidades.reduce((acc, especialidad) => {
          // Filtrar detectives que tengan esta especialidad en su array de especialidades
          acc[especialidad] = detectives.filter((det) => 
            det.especialidad && det.especialidad.includes(especialidad)  // Verifica si la especialidad está en el array
          ).length;
          return acc;
        }, {});
  
        setData(conteoEspecialidades);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  



  // Datos para la gráfica (puedes modificar según lo que necesites)

  

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
          fontSize: '2rem', // Aumenta el tamaño del ícono
          padding: '16px',  // Ajusta el tamaño del botón
          '&:hover': {
            backgroundColor: '#005f91',
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <MenuIcon sx={{ fontSize: 'inherit' }} /> {/* El ícono toma el tamaño del IconButton */}
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            position: 'absolute',  // Cambiar a absolute para ubicarlo en la esquina
            top: 16,  // Ajusta la distancia desde la parte superior
            right: 16,  // Ajusta la distancia desde la parte derecha
          }}
        >
          {/* Botón de "Responder Solicitudes" al lado izquierdo del avatar */}
          <Button
            onClick={() => navigate('/responder-solicitudes')}
            sx={{
              backgroundColor: '#0077b6',
              color: 'white',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              position: 'relative',
              paddingRight: '10px', // Ajuste el padding según sea necesario
              '&:hover': {
                backgroundColor: '#005f91',
              },
            }}
          >
            <InboxIcon sx={{ fontSize: 24 }} /> {/* Ícono agregado */}
            Responder Solicitudes

            {/* Punto blanco con animación de desvanecimiento */}
            <span
              style={{
                position: 'absolute',
                top: '4px', // Mantenerlo en la parte superior derecha del botón
                right: '4px', // Ajustar a la derecha
                width: '12px',
                height: '12px',
                backgroundColor: 'white', // Cambiar a blanco
                borderRadius: '50%', // Mantenerlo como círculo
                animation: 'fade 2s ease-in-out infinite', // Animación de desvanecimiento
              }}
            />
          </Button>

          {/* Avatar que abre el menú */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              sx={{
                backgroundColor: '#fff',
                color: '#0077b6',
                border: '1px solid #0077b6',
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: '#f0f8ff',
                },
              }}
              src="https://icones.pro/wp-content/uploads/2021/02/symbole-masculin-icone-l-utilisateur-gris.png" // Imagen predefinida
              alt="Imagen"
            />
          </IconButton>

          {/* Texto de "Hola, administrador" */}
          <Typography variant="body1" sx={{ color: 'black' }}>
            Hola, administrador
          </Typography>

          {/* Flecha hacia abajo */}
          <IconButton onClick={handleMenuOpen}>
            <ArrowDropDownIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>

// Estilo para la animación de desvanecimiento
        <style>
          {`
    @keyframes fade {
      0% {
        opacity: 1; /* Visible al inicio */
      }
      50% {
        opacity: 0; /* Desvanecido a la mitad */
      }
      100% {
        opacity: 1; /* Vuelve a ser visible al final */
      }
    }
  `}
        </style>

// Menu del Avatar
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          sx={{
            mt: 2, // Ajusta la distancia entre el avatar y el menú
          }}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Cerrar Sesión
          </MenuItem>
        </Menu>

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
      </Drawer>

      {/* Contenido principal */}
      {/* Contenido principal */}
      {/* Contenido principal */}
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#0077b6', fontWeight: 'bold' }}>
          Informe general
        </Typography>

        {/* Información general */}
        <Grid container spacing={3}>
      {Object.entries(data).map(([especialidad, cantidad], index) => (
        <Grid item xs={12} sm={6} md={4} key={especialidad}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <Card
              sx={{
                padding: 3,
                backgroundColor: 'rgba(0, 119, 182, 0.1)',
                borderRadius: 2,
                boxShadow: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 119, 182, 0.2)',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0077b6',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                  }}
                >
                  {especialidad}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif',
                    marginTop: 1,
                  }}
                >
                  {cantidad}
                </Typography>
                <Typography sx={{ mt: 2, fontStyle: 'italic', color: '#555' }}>
                  Detectives especializados en esta área.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#0077b6' }}>Casos Abiertos</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{casos.length}</Typography>
                  <Typography sx={{ mt: 2 }}>Número de casos actualmente abiertos para investigación.</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#0077b6' }}>Clientes Atendidos</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{clientes.length}</Typography>
                  <Typography sx={{ mt: 2 }}>Clientes que han recibido servicios de investigación en el último mes.</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        

        {/* Sección de Gráficas */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ color: '#0077b6', fontWeight: 'bold' }}>Casos por Mes</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="casos" stroke="#0077b6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminMenu;