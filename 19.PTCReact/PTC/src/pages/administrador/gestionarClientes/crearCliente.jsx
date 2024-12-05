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
import NavbarSidebar from '../NavbarSidebar'; // Importa tu NavbarSidebar

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
        navigate('/gestion-clientes');
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

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',  // Asegura que siempre ocupe al menos el 100% de la altura
      background: 'linear-gradient(to right, #006f8e, #0097b6)',
      paddingTop: 'px',
    }}
  >
    <NavbarSidebar /> {/* Navbar arriba */}
    
    <Box
      sx={{
        flex: 10,  // Permite que el contenido ocupe el espacio restante
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
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
            onChange={handleNumberInput}
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#0077b6',
                '&:hover': { backgroundColor: '#005f91' },
                width: '48%',
              }}
            >
              Crear Cliente
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                color: '#0077b6',
                borderColor: '#0077b6',
                width: '48%',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              Volver
            </Button>
          </Box>
        </form>
      </Container>
      </Box>
    </Box>
  );
};

export default CrearCliente;
