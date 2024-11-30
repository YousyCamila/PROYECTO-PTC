import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AgregarEvidencia = ({ casoId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaEvidencia: '',
    descripcion: '',
    tipoEvidencia: '',
    archivo: null,
  });

  const [caso, setCaso] = useState(null); // Para almacenar el caso relacionado
  const tiposEvidencia = ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'];

  // Obtener el caso relacionado con el cliente o el caso específico
  const obtenerCaso = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/caso/${casoId}`);
      const data = await response.json();
      if (response.ok) {
        setCaso(data); // Guardar el caso obtenido
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener el caso',
          text: data.error || 'No se pudo obtener el caso.',
        });
      }
    } catch (error) {
      console.error('Error al obtener el caso:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado al obtener el caso.',
      });
    }
  };

  useEffect(() => {
    obtenerCaso(); // Obtener el caso al cargar el componente
  }, [casoId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, archivo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tiposEvidencia.includes(formData.tipoEvidencia)) {
      Swal.fire({
        icon: 'error',
        title: 'Tipo de Evidencia no Válido',
        text: 'Selecciona un tipo de evidencia válido.',
      });
      return;
    }

    // Crear una instancia de FormData
    const data = new FormData();
    data.append('fechaEvidencia', formData.fechaEvidencia);
    data.append('descripcion', formData.descripcion);
    data.append('idCasos', caso._id); // Asociar automáticamente el caso
    data.append('tipoEvidencia', formData.tipoEvidencia);
    data.append('archivo', formData.archivo); // Agregar el archivo

    try {
      const response = await fetch('http://localhost:3000/api/evidencias/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();  // Obtener datos de la respuesta, como el ID del archivo subido

        Swal.fire({
          icon: 'success',
          title: 'Evidencia Agregada',
          text: 'La evidencia se ha agregado exitosamente.',
        });

        // Actualizar el caso con la nueva evidencia, pero en lugar de agregar el FormData, usamos los datos del archivo
        const updatedCaso = await fetch(`http://localhost:3000/api/caso/${caso._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            evidencias: [...caso.evidencias, responseData.evidencia], // Usar la evidencia agregada que viene de la respuesta
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (updatedCaso.ok) {
          // Redirigir al menú general de clientes
          navigate('/cliente-menu');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el caso',
            text: 'No se pudo actualizar el caso con la nueva evidencia.',
          });
        }
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo agregar la evidencia.',
        });
      }
    } catch (error) {
      console.error('Error al agregar evidencia:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
      });
    }
  };

  if (!caso) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" sx={{ color: '#0077b6' }}>
          Cargando caso...
        </Typography>
      </Box>
    );
  }

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6', mb: 2 }}>
          Agregar Evidencia al Caso: {caso.nombreCaso}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Fecha de Evidencia"
            type="date"
            name="fechaEvidencia"
            margin="normal"
            value={formData.fechaEvidencia}
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
            <InputLabel id="tipoEvidencia-label">Tipo de Evidencia</InputLabel>
            <Select
              labelId="tipoEvidencia-label"
              name="tipoEvidencia"
              value={formData.tipoEvidencia}
              onChange={handleChange}
              required
            >
              {tiposEvidencia.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button component="label" fullWidth variant="outlined" sx={{ mt: 3 }}>
            Subir Archivo
            <input
              type="file"
              hidden
              name="archivo"
              accept="application/pdf,image/*,video/*"
              onChange={handleChange}
              required
            />
          </Button>

          {formData.archivo && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Archivo seleccionado: {formData.archivo.name}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
            }}
          >
            Agregar Evidencia
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/cliente-menu')}
          >
            Cancelar
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default AgregarEvidencia;
