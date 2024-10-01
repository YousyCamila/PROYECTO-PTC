import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const EditarDetective = () => {
  const { id } = useParams(); // Obtener el ID del detective de la URL
  const navigate = useNavigate(); // Inicializa el hook para la navegación

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    especialidad: '',
    activo: true,
  });

  useEffect(() => {
    // Fetch del detective por ID
    const fetchDetective = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/detectives/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Verifica si se encontró el detective y establece los datos en el formulario
        if (data) {
          setFormData({
            tipoDocumento: data.tipoDocumento,
            numeroDocumento: data.numeroDocumento,
            nombres: data.nombres,
            apellidos: data.apellidos,
            correo: data.correo,
            fechaNacimiento: new Date(data.fechaNacimiento).toISOString().split('T')[0], // Formato YYYY-MM-DD
            especialidad: data.especialidad,
            activo: data.activo,
          });
        }
      } catch (error) {
        console.error('Error fetching detective:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del detective: ' + error.message,
        });
      }
    };

    fetchDetective();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/detectives/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'Los datos del detective han sido actualizados.',
        });
        navigate('/gestionar-detectives'); // Redirigir al menú de gestión de detectives
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar los datos.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar detective:', error);
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Editar Detective
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
            onChange={handleChange}
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
            label="Especialidad"
            name="especialidad"
            margin="normal"
            value={formData.especialidad}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Activo"
            margin="normal"
            value={formData.activo ? 'Sí' : 'No'}
            InputProps={{
              readOnly: true,
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/gestionar-detectives')} // Navegar a la lista de detectives
              sx={{ color: '#0077b6', borderColor: '#0077b6', '&:hover': { backgroundColor: '#e0e0e0' } }}
            >
              Volver
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default EditarDetective;
