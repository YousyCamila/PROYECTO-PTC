import React, { useState, useEffect } from 'react';
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

const EditarCaso = () => {
  const { id } = useParams(); // Obtener el ID del caso de la URL
  const navigate = useNavigate(); // Hook para la navegación

  const [formData, setFormData] = useState({
    nombreCaso: '',
    idCliente: '',
    idDetective: '',
    activo: true,
  });

  // Fetch del caso por ID
  useEffect(() => {
    const fetchCaso = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/caso/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Verifica si se encontró el caso y establece los datos en el formulario
        if (data) {
          setFormData({
            nombreCaso: data.nombreCaso,
            idCliente: data.idCliente._id, // Guarda solo el ID del cliente
            idDetective: data.idDetective ? data.idDetective._id : '', // Guarda solo el ID del detective
            activo: data.activo,
          });
        }
      } catch (error) {
        console.error('Error fetching caso:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del caso.',
        });
      }
    };

    fetchCaso();
  }, [id]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar el formulario para actualizar el caso
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/caso/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Caso Actualizado',
          text: 'Los datos del caso han sido actualizados correctamente.',
        });
        navigate('/gestionar-casos'); // Redirigir a la vista de gestión de casos
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar el caso.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar caso:', error);
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
          Editar Caso
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="nombreCaso-label">Nombre del Caso</InputLabel>
            <Select
              labelId="nombreCaso-label"
              name="nombreCaso"
              value={formData.nombreCaso}
              onChange={handleChange}
              required
            >
              <MenuItem value="cadenaCustodia">Cadena de Custodia</MenuItem>
              <MenuItem value="investigacionExtorsion">Investigación de Extorsión</MenuItem>
              <MenuItem value="estudiosSeguridad">Estudios de Seguridad</MenuItem>
              <MenuItem value="investigacionInfidelidades">Investigación de Infidelidades</MenuItem>
              <MenuItem value="investigacionRobosEmpresariales">Investigación de Robos Empresariales</MenuItem>
              <MenuItem value="antecedentes">Antecedentes</MenuItem>
              <MenuItem value="recuperacionVehiculos">Recuperación de Vehículos</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Cliente"
            margin="normal"
            value={formData.idCliente} // Muestra el ID del cliente
            InputProps={{
              readOnly: true, // Campo solo lectura
            }}
          />

          <TextField
            fullWidth
            label="Detective"
            margin="normal"
            value={formData.idDetective || 'No asignado'} // Muestra el ID del detective o un mensaje
            InputProps={{
              readOnly: true, // Campo solo lectura
            }}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
          >
            Guardar Cambios
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)} // Navegar hacia atrás
            sx={{
              color: '#0077b6',
              borderColor: '#0077b6',
              mt: 2,
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            Volver
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default EditarCaso;
