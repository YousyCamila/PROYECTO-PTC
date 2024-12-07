import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Paper,FormControlLabel,Switch } from '@mui/material';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { Person as PersonIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import NavbarSidebar from '../NavbarSidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    activo: true,
  });

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setFormData({
          tipoDocumento: data.tipoDocumento,
          numeroDocumento: data.numeroDocumento,
          nombres: data.nombres,
          apellidos: data.apellidos,
          correo: data.correo,
          fechaNacimiento: new Date(data.fechaNacimiento).toISOString().split('T')[0],
          activo: data.activo,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo cargar la información del cliente: ${error.message}`,
        });
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'Los datos del cliente han sido actualizados.',
        });
        navigate('/gestionar-clientes');
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar los datos.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode ? '#121212' : 'linear-gradient(135deg, #1a237e 0%, #5c6bc0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: 8,
        }}
      >
        <NavbarSidebar />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={12}
              sx={{
                borderRadius: 4,
                padding: 4,
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                <PersonIcon sx={{ fontSize: 40, color: darkMode ? '#bbdefb' : '#1a237e', marginRight: 2 }} />
                <Typography variant="h4" color={darkMode ? 'white' : 'primary'} fontWeight="bold">
                  Editar Perfil de Cliente
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel>Tipo de Documento</InputLabel>
                      <Select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleChange}
                        label="Tipo de Documento"
                      >
                        <MenuItem value="Cédula">Cédula</MenuItem>
                        <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                        <MenuItem value="Cédula de Extranjería">Cédula de Extranjería</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número de Documento"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombres"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      variant="outlined"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Nacimiento"
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.activo}
                          onChange={(e) => setFormData(prev => ({ ...prev, activo: e.target.checked }))}
                          color="primary"
                        />
                      }
                      label="Cliente Activo"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    color="primary"
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    color="primary"
                  >
                    Guardar cambios
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

export default EditarCliente;
