import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid
} from '@mui/material';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar';

const EditarCaso = () => {
  const { id } = useParams(); // Obtener el ID del caso de la URL
  const navigate = useNavigate(); // Hook para la navegación

  const [formData, setFormData] = useState({
    nombreCaso: '',
    idCliente: '',
    idDetective: '',
    clienteNombre: '', // Nuevo campo para almacenar el nombre del cliente
    detectiveNombre: '', // Nuevo campo para almacenar el nombre del detective
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
            clienteNombre: data.nombreCliente, // Nombre del cliente desde el caso
            detectiveNombre: data.nombreDetective || 'No asignado', // Nombre del detective (si existe)
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #006f8e, #0097b6)',
        paddingTop: '0px',
      }}
    >
      <NavbarSidebar />

      <Box
        sx={{
          flex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 2,
            position: 'relative',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.02)' },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: '#0097b6',
              marginBottom: 3,
            }}
          >
            Editar Caso
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="nombreCaso-label">Nombre del Caso</InputLabel>
                  <Select
                    labelId="nombreCaso-label"
                    name="nombreCaso"
                    value={formData.nombreCaso}
                    onChange={handleChange}
                    required
                    sx={{
                      backgroundColor: '#f5f5f5',
                      '& .MuiSelect-root': { padding: '10px' },
                    }}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cliente"
                  margin="normal"
                  value={formData.clienteNombre}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    '& .MuiInputBase-root': { padding: '10px' },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detective"
                  margin="normal"
                  value={formData.detectiveNombre}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    '& .MuiInputBase-root': { padding: '10px' },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Activo"
                  margin="normal"
                  value={formData.activo ? 'Sí' : 'No'}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    '& .MuiInputBase-root': { padding: '10px' },
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#006f8e',
                '&:hover': { backgroundColor: '#004f6f' },
                padding: '10px',
              }}
            >
              Guardar Cambios
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                mt: 2,
                color: '#006f8e',
                borderColor: '#006f8e',
                '&:hover': { backgroundColor: '#e0f7fa' },
                padding: '10px',
                width: '100%',
              }}
            >
              Volver
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default EditarCaso;
