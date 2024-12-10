import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const AgregarRegistroForm = () => {
  const { casoId } = useParams(); // Obtener el casoId desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descripcion: '',
    fechaInicio: '',
    estadoRegistro: '',
  });

  const estadosRegistro = ['Comenzando', 'En Progreso', 'Finalizando'];

  // Manejar cambios en los campos de texto y selección
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/registros-caso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, idCasos: casoId }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Agregado',
          text: 'El registro se ha agregado exitosamente.',
        });
        navigate(`/registros-crud/${casoId}`); // Redirigir a la lista de registros
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'No se pudo agregar el registro.',
        });
      }
    } catch (error) {
      console.error('Error al agregar registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
      });
    }
  };

  return (
    <Container
      sx={{
        mt: 4,
        p: 4,
        backgroundColor: '#eaf4fc',
        borderRadius: 2,
        boxShadow: 3,
        color: '#005f91',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#005f91' }}>
        Agregar Registro
      </Typography>
      <Divider sx={{ mb: 3, backgroundColor: '#d1e0e5' }} />

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Fecha de Inicio"
          type="date"
          name="fechaInicio"
          margin="normal"
          value={formData.fechaInicio}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="descripcion"
          margin="normal"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="estadoRegistro-label" sx={{ color: '#005f91' }}>
            Estado del Registro
          </InputLabel>
          <Select
            labelId="estadoRegistro-label"
            name="estadoRegistro"
            value={formData.estadoRegistro}
            onChange={handleChange}
            required
            sx={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            {estadosRegistro.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
            }}
          >
            Agregar Registro
          </Button>
          <Button
            onClick={() => navigate(`/registros-crud/${casoId}`)}
            variant="outlined"
            sx={{
              color: '#005f91',
              borderColor: '#005f91',
              '&:hover': { borderColor: '#0077b6', color: '#0077b6' },
            }}
          >
            Volver
          </Button>
        </Box>
      </form>
    </Container>
  );
};
 
export default AgregarRegistroForm;
