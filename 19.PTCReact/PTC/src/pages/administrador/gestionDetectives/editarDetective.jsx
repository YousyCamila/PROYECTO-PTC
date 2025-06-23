import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  MenuItem,
  Autocomplete,
  Chip,
  FormControlLabel,
  Switch,
  IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavbarSidebar from '../NavbarSidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const EditarDetective = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    especialidad: [],
    activo: true,
  });

  const [darkMode, setDarkMode] = useState(false);

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

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const fetchDetective = async () => {
      try {
        const response = await fetch(`https://proyecto-ptc.onrender.com/api/detectives/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setFormData({
          tipoDocumento: data.tipoDocumento,
          numeroDocumento: data.numeroDocumento,
          nombres: data.nombres,
          apellidos: data.apellidos,
          correo: data.correo,
          fechaNacimiento: new Date(data.fechaNacimiento).toISOString().split('T')[0],
          especialidad: data.especialidad,
          activo: data.activo,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo cargar la información del detective: ${error.message}`,
        });
      }
    };

    fetchDetective();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir nombres y apellidos a mayúsculas
    const updatedFormData = {
      ...formData,
      nombres: formData.nombres.toUpperCase(),
      apellidos: formData.apellidos.toUpperCase(),
      // Unir las especialidades con comas
      especialidad: formData.especialidad.join(', '),
    };

    try {
      const response = await fetch(`https://proyecto-ptc.onrender.com/api/detectives/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'Los datos del detective han sido actualizados.',
        });
        navigate('/gestionar-detectives');
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
                  Editar Perfil de Detective
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Tipo de Documento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    >
                      <MenuItem value="Cédula">Cédula</MenuItem>
                      <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                      <MenuItem value="Cédula de Extranjería">Cédula de Extranjería</MenuItem>
                    </TextField>
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
                      onChange={handleChange} // Asegúrate de manejar el cambio
                      variant="outlined"
                      required
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
                    <Autocomplete
                      multiple
                      options={especialidades}
                      value={formData.especialidad}
                      onChange={(_, newValue) => setFormData(prev => ({ ...prev, especialidad: newValue }))}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            color="primary"
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Especialidades"
                          placeholder="Seleccione especialidades"
                        />
                      )}
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
                      label="Detective Activo"
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

              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: darkMode ? '#424242' : '#f0f0f0',
                }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Paper>
          </Container>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default EditarDetective;
