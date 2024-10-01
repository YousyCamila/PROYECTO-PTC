import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const ClienteForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializa el hook para la navegación
  const params = new URLSearchParams(location.search);
  const email = params.get('email'); // Obtener el email desde la URL

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: email, // Usar el correo desde la URL
    fechaNacimiento: '',
    activo: true, // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  // Validar que el número de documento solo contenga números
  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setFormData({ ...formData, numeroDocumento: value });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Entrada no válida',
        text: 'El número de documento solo puede contener números.',
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #0077b6, #00b4d8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            fontWeight: "bold",
            fontSize: 24,
            color: "#0077b6",
          }}
        >
          PTC
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center", color: "#0077b6" }}>
          Registro de Cliente
        </Typography>

        <form onSubmit={handleSubmit}>
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
          <TextField
            fullWidth
            label="Número de Documento"
            name="numeroDocumento"
            margin="normal"
            value={formData.numeroDocumento}
            onChange={handleNumberInput} // Validación en tiempo real
            required
          />
          <TextField
            fullWidth
            label="Nombres"
            name="nombres"
            margin="normal"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="apellidos"
            margin="normal"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
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
          <TextField
            fullWidth
            label="Activo"
            margin="normal"
            value={formData.activo ? 'Sí' : 'No'} // Mostrar el valor por defecto
            InputProps={{
              readOnly: true, // Campo solo lectura
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
          >
            Guardar
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ClienteForm;
