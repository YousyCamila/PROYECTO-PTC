import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Grid, IconButton, Snackbar, Alert, Checkbox, ListItemText } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const DetectiveForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: email,
    fechaNacimiento: '',
    especialidad: [],
    activo: true,
  });

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, correo: email }));
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    const age = validateAge(formData.fechaNacimiento);
    if (age < 18) {
      alert('Debes tener al menos 18 años para registrarte.');
      return;
    }

    try {
      const formattedData = {
        ...formData,
        nombres: formData.nombres.toUpperCase(),
        apellidos: formData.apellidos.toUpperCase(),
      };

      const response = await fetch('http://localhost:3000/api/detectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSnackbar(true);
        setTimeout(() => navigate('/login'), 2000); // Redirigir después de 2 segundos
      } else {
        alert(data.error || 'No se pudo guardar los datos.');
      }
    } catch (error) {
      console.error('Error al guardar datos:', error);
      alert('Ocurrió un error inesperado.');
    }
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    const isPasaporte = formData.tipoDocumento === "Pasaporte";

    if (isPasaporte) {
      // Permitir letras, números y espacios para pasaporte
      if (/^[a-zA-Z0-9\s]*$/.test(value)) {
        setFormData({ ...formData, [e.target.name]: value });
      }
    } else {
      // Permitir solo números para otros tipos de documento
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [e.target.name]: value });
      }
    }
  };

  const handleTextInput = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setFormData({ ...formData, [e.target.name]: value });
    } else {
      alert('Solo se permiten letras y espacios.');
    }
  };

  const handleEspecialidadChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, especialidad: typeof value === 'string' ? value.split(',') : value });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #0077b6, #00b4d8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0077b6',
          color: 'white',
          padding: '10px 20px',
        }}
      >
        <IconButton
          onClick={() => navigate('/register')}
          sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '6px' }}>
            Volver
          </Typography>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          PTC - Registro de Detective
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%' }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            marginTop: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center', color: '#0077b6', marginBottom: 8 }}
          >
            Registro de Detective
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="tipoDocumento-label">Tipo de Documento</InputLabel>
                  <Select
                    labelId="tipoDocumento-label"
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Cédula">Cédula</MenuItem>
                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                    <MenuItem value="Cédula de Extranjería">Cédula de Extranjería</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número de Documento"
                  name="numeroDocumento"
                  margin="normal"
                  value={formData.numeroDocumento}
                  onChange={handleNumberInput}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  name="nombres"
                  margin="normal"
                  value={formData.nombres}
                  onChange={handleTextInput}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="apellidos"
                  margin="normal"
                  value={formData.apellidos}
                  onChange={handleTextInput}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correo"
                  margin="normal"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  type="date"
                  name="fechaNacimiento"
                  margin="normal"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="especialidad-label">Especialidad</InputLabel>
                  <Select
                    labelId="especialidad-label"
                    name="especialidad"
                    multiple
                    value={formData.especialidad}
                    onChange={handleEspecialidadChange}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {especialidades.map((especialidad) => (
                      <MenuItem key={especialidad} value={especialidad}>
                        <Checkbox checked={formData.especialidad.includes(especialidad)} />
                        <ListItemText primary={especialidad} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 4, backgroundColor: '#0077b6', color: 'white', width: '100%' }}
            >
              Registrar
            </Button>
          </form>
        </Container>
      </motion.div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Registro exitoso. Redirigiendo a inicio de sesión...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DetectiveForm;
