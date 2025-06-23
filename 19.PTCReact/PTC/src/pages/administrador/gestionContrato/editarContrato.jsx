import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  FormControlLabel, 
  Switch, 
  IconButton 
} from '@mui/material';
import { 
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

const EditarContrato = () => {
  const { id } = useParams(); // Obtener el ID del contrato de la URL
  const navigate = useNavigate(); // Inicializa el hook para la navegación

  const [formData, setFormData] = useState({
    descripcionServicio: '',
    fechaInicio: '',
    fechaCierre: '',
    clausulas: '',
    tarifa: '',
    estado: true,
    idCliente: '', // Guardar el ID del cliente, solo lectura
    idDetective: '', // Guardar el ID del detective, solo lectura
  });

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const fetchContrato = async () => {
      try {
        const response = await fetch(`https://proyecto-ptc.onrender.com/api/contratos/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        
        setFormData({
          descripcionServicio: data.descripcionServicio,
          fechaInicio: new Date(data.fechaInicio).toISOString().split('T')[0],
          fechaCierre: new Date(data.fechaCierre).toISOString().split('T')[0],
          clausulas: data.clausulas || '',
          tarifa: data.tarifa,
          estado: data.estado,
          idCliente: data.idCliente._id,
          idDetective: data.idDetective ? data.idDetective._id : '',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del contrato.',
        });
      }
    };

    fetchContrato();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericTarifa = parseFloat(formData.tarifa);
    if (isNaN(numericTarifa)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La tarifa debe ser un número válido.',
      });
      return;
    }

    try {
      const response = await fetch(`https://proyecto-ptc.onrender.com/api/contratos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcionServicio: formData.descripcionServicio,
          fechaInicio: formData.fechaInicio,
          fechaCierre: formData.fechaCierre,
          clausulas: formData.clausulas,
          tarifa: numericTarifa,
          estado: formData.estado,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Contrato actualizado',
          text: 'El contrato se ha actualizado exitosamente.',
        });
        navigate('/gestionar-contratos');
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar el contrato.',
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
                <Typography variant="h4" color={darkMode ? 'white' : 'primary'} fontWeight="bold">
                  Editar Contrato
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descripción del Servicio"
                      name="descripcionServicio"
                      value={formData.descripcionServicio}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Inicio"
                      type="date"
                      name="fechaInicio"
                      value={formData.fechaInicio}
                      onChange={handleChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Cierre"
                      type="date"
                      name="fechaCierre"
                      value={formData.fechaCierre}
                      onChange={handleChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cláusulas"
                      name="clausulas"
                      value={formData.clausulas}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tarifa"
                      name="tarifa"
                      value={formData.tarifa}
                      onChange={handleChange}
                      variant="outlined"
                      type="number"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.estado}
                          onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.checked }))}
                          color="primary"
                        />
                      }
                      label="Contrato Activo"
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

export default EditarContrato;
