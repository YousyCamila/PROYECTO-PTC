import React, { useState } from 'react';
import { Box, IconButton, Typography, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Snackbar, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClienteForm = () => {
  const navigate = useNavigate(); // Usa el hook useNavigate
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email'); // Obtener el email desde la URL

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: email, // Usar el correo desde la URL
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validar que el número de documento solo contenga números
  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  // Validar que solo se permitan letras (nombres y apellidos)
  const handleTextInput = (e) => {
    const value = e.target.value;
    // Solo letras y espacios permitidos
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    // Si la fecha de nacimiento aún no ha ocurrido este año, restar un año
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar la edad
    const age = validateAge(formData.fechaNacimiento);
    if (age < 18) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes tener al menos 18 años para registrarte.',
      });
      return; // Detener el proceso de envío si la edad es menor de 18
    }

    try {
      const response = await fetch("http://localhost:3000/api/clientes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Datos del cliente guardados correctamente!',
        });
        
        // Redirigir al login después de guardar los datos
        navigate("/login"); // Redirige a la página de inicio de sesión
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo guardar los datos.',
        });
      }
    } catch (error) {
      console.error('Error al guardar datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
      });
    }
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
          onClick={() => navigate('/login')} // Redirige a la ruta '/register'
          sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '6px' }}>
            Volver
          </Typography>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          PTC - Registro de Cliente
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
            Registro de Cliente
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
                  onChange={handleTextInput} // Usar la validación para letras
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
                  onChange={handleTextInput} // Usar la validación para letras
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  margin="normal"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  margin="normal"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#00b4d8" } }}
            >
              Registrar
            </Button>
          </form>
        </Container>
      </motion.div>
    </Box>
  );
};

export default ClienteForm;
