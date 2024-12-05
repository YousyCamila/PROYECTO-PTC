import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  ListItemText,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar'; // Importa el componente NavbarSidebar

const EditarDetective = () => {
  const { id } = useParams(); // Obtener el ID del detective desde la URL
  const navigate = useNavigate(); // Hook para la navegación

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    especialidad: [],
    activo: true,
  });

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

  // Fetch inicial para cargar los datos del detective
  useEffect(() => {
    const fetchDetective = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/detectives/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setFormData({
          tipoDocumento: data.tipoDocumento,
          numeroDocumento: data.numeroDocumento,
          nombres: data.nombres,
          apellidos: data.apellidos,
          correo: data.correo,
          fechaNacimiento: new Date(data.fechaNacimiento).toISOString().split('T')[0],
          especialidad: data.especialidad,
          activo: data.activo,
        });
      } catch (error) {
        console.error('Error al cargar los datos del detective:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo cargar la información del detective: ${error.message}`,
        });
      }
    };

    fetchDetective();
  }, [id]);

  // Manejador para los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador para el campo de especialidad
  const handleEspecialidadChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, especialidad: typeof value === 'string' ? value.split(',') : value });
  };

  // Manejador para el envío del formulario
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
        navigate('/gestionar-detectives'); // Redirige a la lista de detectives
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar los datos.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar el detective:', error);
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
        paddingTop: '20px',
      }}
    >
      <NavbarSidebar />

      <Box
        sx={{
          flex: 1,
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
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.02)' },
          }}
        >
          <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: '#0097b6', marginBottom: 3 }}>
            Editar Detective
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de Documento"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correo"
                  value={formData.correo}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  type="date"
                  name="fechaNacimiento"
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: '#006f8e', '&:hover': { backgroundColor: '#004f6f' } }}
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

export default EditarDetective;
