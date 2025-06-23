import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Grid,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Person as PersonIcon, ArrowBack as BackIcon, Save as SaveIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSidebar from '../NavbarSidebar'; // Importa tu NavbarSidebar

const CrearCliente = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
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
            : 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)'
        }
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(30, 30, 30, 0.9)',
            }
          }
        }
      }
    }), [mode]
  );

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = validateAge(fechaNacimiento);
    if (age < 18) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes tener al menos 18 años para registrarte.',
      });
      return;
    }

    const newCliente = {
      nombres: nombres.toUpperCase(),
      apellidos: apellidos.toUpperCase(),
      correo,
      numeroDocumento,
      tipoDocumento,
      fechaNacimiento,
      activo: true
    };

    try {
      const response = await fetch("https://proyecto-ptc.onrender.com/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCliente),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Creado!',
          text: 'Cliente creado exitosamente.',
        });
        navigate('/gestionar-clientes');
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error al crear cliente:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el cliente. ' + error.message,
      });
    }
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (tipoDocumento === "Pasaporte") {
      setNumeroDocumento(value);
    } else if (/^\d*$/.test(value) || value === '') {
      setNumeroDocumento(value);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Entrada no válida',
        text: 'El número de documento solo puede contener números (Cédula) o letras y números (Pasaporte).',
      });
    }
  };

  const handleTextInput = (e, setter) => {
    const value = e.target.value;
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      setter(value);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Entrada no válida',
        text: 'Los nombres y apellidos solo pueden contener letras y espacios.',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        background: theme.palette.background.default,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 8,
        paddingBottom: 2,
        overflow: 'auto',
      }}>
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
                    marginBottom: 2
                  }}
                >
                  <PersonIcon sx={{ fontSize: { xs: 40, sm: 50 } }} />
                </Avatar>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: { xs: '1.8rem', sm: '2.125rem' }
                  }}
                >
                  Crear Cliente
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Tipo de Documento</InputLabel>
                      <Select
                        value={tipoDocumento}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                        label="Tipo de Documento"
                      >
                        <MenuItem value="Cedula">Cédula</MenuItem>
                        <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Número de Documento"
                      variant="outlined"
                      value={numeroDocumento}
                      onChange={handleNumberInput}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Nombres"
                      variant="outlined"
                      value={nombres}
                      onChange={(e) => handleTextInput(e, setNombres)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Apellidos"
                      variant="outlined"
                      value={apellidos}
                      onChange={(e) => handleTextInput(e, setApellidos)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Correo Electrónico"
                      variant="outlined"
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Fecha de Nacimiento"
                      variant="outlined"
                      type="date"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/gestionar-clientes')}
                  >
                    Regresar
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    Guardar
                  </Button>
                </Box>
              </form>
            </Paper>
          </Container>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default CrearCliente;
