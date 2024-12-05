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
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const AgregarEvidencia = () => {
  const { casoId } = useParams(); // Obtener el casoId desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaEvidencia: '',
    descripcion: '',
    tipoEvidencia: '',
    archivo: null, // Inicializar el archivo como null
  });

  const tiposEvidencia = ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'];

  // Manejar cambios en los campos de texto y selección
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la selección del archivo
  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo: e.target.files[0] });
  };

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(); // Crear un objeto FormData para enviar archivos
    data.append('fechaEvidencia', formData.fechaEvidencia);
    data.append('descripcion', formData.descripcion);
    data.append('tipoEvidencia', formData.tipoEvidencia);
    data.append('idCasos', casoId);
    if (formData.archivo) {
      data.append('archivo', formData.archivo); // Agregar el archivo al FormData
    }

    try {
      const response = await fetch('http://localhost:3000/api/evidencias/upload', {
        method: 'POST',
        body: data, // Enviar el objeto FormData
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Evidencia Agregada',
          text: 'La evidencia se ha agregado exitosamente.',
        });
        navigate(`/caso/${casoId}/evidencias`); // Redirigir al listado de evidencias del caso
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'No se pudo agregar la evidencia.',
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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Agregar Evidencia
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <Button
          variant="contained"
          component="label" // Esto permite seleccionar un archivo
          sx={{ mt: 2, mb: 2 }}
        >
          Subir Archivo
          <input
            type="file"
            name="archivo"
            hidden
            onChange={handleFileChange} // Manejar la selección del archivo
          />
        </Button>
        {formData.archivo && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Archivo seleccionado: {formData.archivo.name}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
        <Button onClick={() => navigate(`/caso/${casoId}/evidencias`)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
};

export default AgregarEvidencia;
