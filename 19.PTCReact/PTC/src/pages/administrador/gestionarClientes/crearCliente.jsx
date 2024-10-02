import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Snackbar,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearCliente = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const navigate = useNavigate();

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
    const age = validateAge(fechaNacimiento);
    if (age < 18) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes tener al menos 18 años para registrarte.',
      });
      return; // Detener el proceso de envío si la edad es menor de 18
    }

    const newCliente = { nombres, apellidos, correo, numeroDocumento, tipoDocumento, fechaNacimiento, activo: true };

    try {
      const response = await fetch("http://localhost:3000/api/clientes", {
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
        navigate('/gestion-clientes'); // Redirigir a la lista de clientes
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
    // Permitir solo números si el tipo de documento es "Cédula", y permitir letras y números si es "Pasaporte"
    if (tipoDocumento === "Pasaporte") {
      setNumeroDocumento(value); // Permitir letras y números
    } else if (/^\d*$/.test(value) || value === '') {
      setNumeroDocumento(value); // Solo permitir números
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Entrada no válida',
        text: 'El número de documento solo puede contener números (Cédula) o letras y números (Pasaporte).',
      });
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #001f3f, #0077b6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Crear Cliente
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipoDocumento-label">Tipo de Documento</InputLabel>
            <Select
              labelId="tipoDocumento-label"
              name="tipoDocumento"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
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
            margin="normal"
            value={numeroDocumento}
            onChange={handleNumberInput} // Validación en tiempo real
            required
          />
          <TextField
            fullWidth
            label="Nombres"
            margin="normal"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Apellidos"
            margin="normal"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Correo"
            margin="normal"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            type="date"
            margin="normal"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
              mt: 2,
            }}
          >
            Crear Cliente
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)} // Navegar hacia atrás
            sx={{
              color: '#0077b6',
              borderColor: '#0077b6',
              mt: 2,
              '&:hover': { backgroundColor: '#e0e0e0' },
              ml: 2,
            }}
          >
            Volver
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default CrearCliente;
