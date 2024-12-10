import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  MenuItem, 
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

const EditarCaso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCaso: '',
    idCliente: '',
    idDetective: '',
    clienteNombre: '',
    detectiveNombre: 'No asignado',
    activo: true,
  });

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const fetchCaso = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/caso/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        setFormData({
          nombreCaso: data.nombreCaso,
          idCliente: data.idCliente._id,
          idDetective: data.idDetective ? data.idDetective._id : '',
          clienteNombre: data.nombreCliente,
          detectiveNombre: data.nombreDetective || 'No asignado',
          activo: data.activo,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del caso.',
        });
      }
    };

    fetchCaso();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/caso/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Caso Actualizado',
          text: 'Los datos del caso han sido actualizados correctamente.',
        });
        navigate('/gestionar-casos');
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar el caso.',
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
                <Typography variant="h4" color={darkMode ? 'white' : 'primary'} fontWeight="bold">
                  Editar Caso
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre del Caso"
                      name="nombreCaso"
                      value={formData.nombreCaso}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cliente"
                      value={formData.clienteNombre}
                      variant="outlined"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Detective"
                      value={formData.detectiveNombre}
                      variant="outlined"
                      disabled
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
                      label="Caso Activo"
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

export default EditarCaso;
