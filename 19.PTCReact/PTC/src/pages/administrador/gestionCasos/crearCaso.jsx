import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSidebar from '../NavbarSidebar';

const CrearCaso = () => {
  const [formData, setFormData] = useState({
    nombreCaso: '',
    idCliente: '',
    idDetective: '',
  });
  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const [mode, setMode] = useState('light');
  const navigate = useNavigate();

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? '#2575fc' : '#6a11cb',
        },
        background: {
          default: mode === 'light'
            ? 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)'
            : 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(30, 30, 30, 0.9)',
            },
          },
        },
      },
    }), [mode]
  );

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const fetchClientesYDetectives = async () => {
    try {
      const [clientesRes, detectivesRes] = await Promise.all([
        fetch('http://localhost:3000/api/clientes'),
        fetch('http://localhost:3000/api/detectives'),
      ]);
      const clientesData = await clientesRes.json();
      const detectivesData = await detectivesRes.json();

      setClientes(clientesData);
      setDetectives(detectivesData);
    } catch (error) {
      console.error('Error al cargar clientes y detectives:', error);
    }
  };

  useEffect(() => {
    fetchClientesYDetectives();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombreCaso, idCliente, idDetective } = formData;
  
    if (!nombreCaso || !idCliente || !idDetective) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
      });
      return;
    }
  
    // Buscar los nombres de cliente y detective en los arrays cargados
    const clienteSeleccionado = clientes.find(cliente => cliente._id === idCliente);
    const detectiveSeleccionado = detectives.find(detective => detective._id === idDetective);
  
    // Asegurarse de que se obtuvieron correctamente los nombres
    if (!clienteSeleccionado || !detectiveSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cliente o Detective no válidos.',
      });
      return;
    }
  
    const newCaso = {
      nombreCaso,
      idCliente,
      nombreCliente: `${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}`,
      idDetective,
      nombreDetective: `${detectiveSeleccionado.nombres} ${detectiveSeleccionado.apellidos}`,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/caso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCaso),
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Creado!',
          text: 'Caso creado exitosamente.',
        });
        navigate('/gestionar-casos');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Error al crear caso:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No se pudo crear el caso. ${error.message}`,
      });
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: theme.palette.background.default,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 8,
          paddingBottom: 2,
        }}
      >
        <NavbarSidebar />

        <IconButton
          onClick={toggleThemeMode}
          sx={{
            position: 'absolute',
            top: 80,
            right: 10,
            color: mode === 'light' ? '#2575fc' : '#6a11cb',
          }}
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: 600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Container maxWidth="sm" sx={{ width: '100%', py: 4 }}>
            <Paper
              elevation={10}
              sx={{
                borderRadius: 4,
                padding: { xs: 2, sm: 4 },
                backdropFilter: 'blur(10px)',
                width: '100%',
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    width: { xs: 60, sm: 80 },
                    height: { xs: 60, sm: 80 },
                    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                    marginBottom: 2,
                  }}
                >
                  <AssignmentIcon sx={{ fontSize: { xs: 40, sm: 50 } }} />
                </Avatar>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: { xs: '1.8rem', sm: '2.125rem' },
                  }}
                >
                  Crear Caso
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Nombre del Caso</InputLabel>
                      <Select
                        name="nombreCaso"
                        value={formData.nombreCaso}
                        onChange={handleChange}
                        label="Nombre del Caso"
                        required
                      >
                        <MenuItem value="Cadena de custodia">Cadena de Custodia</MenuItem>
                        <MenuItem value="Investigación de extorsión">Investigación de Extorsión</MenuItem>
                        <MenuItem value="Estudios de seguridad">Estudios de Seguridad</MenuItem>
                        <MenuItem value="Investigación de infidelidades">Investigación de Infidelidades</MenuItem>
                        <MenuItem value="Investigación de robos empresariales">Investigación de Robos Empresariales</MenuItem>
                        <MenuItem value="Antecedentes">Antecedentes</MenuItem>
                        <MenuItem value="Recuperación de vehículos">Recuperación de Vehículos</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Cliente</InputLabel>
                      <Select
                        name="idCliente"
                        value={formData.idCliente}
                        onChange={handleChange}
                        label="Cliente"
                      >
                        {clientes.map((cliente) => (
                          <MenuItem key={cliente._id} value={cliente._id}>
                            {cliente.nombres} {cliente.apellidos}

                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Detective</InputLabel>
                      <Select
                        name="idDetective"
                        value={formData.idDetective}
                        onChange={handleChange}
                        label="Detective"
                      >
                        {detectives.map((detective) => (
                          <MenuItem key={detective._id} value={detective._id}>
                            {detective.nombres} {detective.apellidos}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/gestionar-casos')}
                        startIcon={<BackIcon />}
                      >
                        Volver
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<SaveIcon />}
                      >
                        Guardar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default CrearCaso;
