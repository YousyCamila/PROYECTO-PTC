import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';

const AdministradorForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get('email'); // Obtener el email desde la URL

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: email, // Usar el correo desde la URL
    fechaNacimiento: '',
  });

  const handleTextInput = (e) => {
    const value = e.target.value;
    // Solo letras y espacios permitidos
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, [e.target.name]: value.toUpperCase() });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación de nombres y apellidos: solo letras
    if ((name === 'nombres' || name === 'apellidos') && !/^[a-zA-Z\s]*$/.test(value)) {
      Swal.fire({
        icon: 'warning',
        title: 'Entrada no válida',
        text: 'Los nombres y apellidos solo pueden contener letras y espacios.',
      });
      return;
    }

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

    // Validar la edad
    const age = validateAge(formData.fechaNacimiento);
    if (age < 18) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes tener al menos 18 años para registrarte.',
      });
      return;
    }

    try {
      const response = await fetch("https://proyecto-ptc.onrender.com/api/administradors", {
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
          text: 'Datos del administrador guardados correctamente!',
        });
        navigate("/login"); // Redirige al login
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


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #0077b6, #00b4d8)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
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
          onClick={() => navigate('/login')}
          sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '6px' }}>
            Volver
          </Typography>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          PTC - Registro de Administrador
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%' }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "white",
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
            sx={{ textAlign: "center", color: "#0077b6", marginBottom: 8 }}
          >
            Registro de Administrador
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
                  onChange={handleNumberInput} // Validación en tiempo real
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correo"
                  margin="normal"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  disabled // No se puede editar
                />
              </Grid>

              <Grid item xs={12}>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </motion.div>
    </Box>
  );
};

export default AdministradorForm;
