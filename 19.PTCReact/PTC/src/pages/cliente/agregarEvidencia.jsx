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

const AgregarEvidencia = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaEvidencia: '',
    descripcion: '',
    idCasos: '', // El usuario debe ingresar el ID del caso manualmente
    tipoEvidencia: '', // Cambiar a una sola opción
    archivo: null, // Para almacenar el archivo que se subirá
  });

  const [evidencias, setEvidencias] = useState([]); // Para almacenar las evidencias del caso

  const tiposEvidencia = ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'];

  // Función para obtener las evidencias de un caso
  const obtenerEvidencias = async (idCasos) => {
    try {
      const response = await fetch(`http://localhost:3000/api/evidencias/${idCasos}`);
      const data = await response.json();
      if (response.ok) {
        setEvidencias(data.evidencias); // Suponiendo que el backend devuelve una lista de evidencias
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener evidencias',
          text: data.error || 'No se pudieron obtener las evidencias.',
        });
      }
    } catch (error) {
      console.error('Error al obtener evidencias:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado al obtener las evidencias.',
      });
    }
  };

  useEffect(() => {
    if (formData.idCasos) {
      obtenerEvidencias(formData.idCasos); // Obtener evidencias si hay un ID de caso
    }
  }, [formData.idCasos]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, archivo: files[0] }); // Si es un archivo, guardar el archivo seleccionado
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el tipo de evidencia seleccionado es válido
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
    data.append('idCasos', formData.idCasos);
    data.append('tipoEvidencia', formData.tipoEvidencia);
    data.append('archivo', formData.archivo); // Aquí agregamos el archivo

    try {
      const response = await fetch("http://localhost:3000/api/evidencias/upload", {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Evidencia Agregada',
          text: 'La evidencia se ha agregado exitosamente.',
        });
        navigate("/cliente-menu"); // Redirigir al menú general de clientes
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center", color: "#0077b6", mb: 2 }}>
          Agregar Evidencia
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Campo para el ID del caso */}
          <TextField
            fullWidth
            label="ID del Caso"
            name="idCasos"
            margin="normal"
            value={formData.idCasos}
            onChange={handleChange}
            required
          />
          
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

          {/* Campo para seleccionar el archivo */}
          <Button
            component="label"
            fullWidth
            variant="outlined"
            sx={{ mt: 3 }}
          >
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

          {/* Mostrar el nombre del archivo si ya fue seleccionado */}
          {formData.archivo && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Archivo seleccionado: {formData.archivo.name}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
          >
            Agregar Evidencia
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/cliente-menu")} // Redirigir al menú general de clientes
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

        {/* Mostrar las evidencias del caso */}
        {evidencias.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
              Evidencias Subidas
            </Typography>
            {evidencias.map((evidencia) => (
              <Box key={evidencia._id} sx={{ mb: 2 }}>
                <Typography variant="body1"><strong>Tipo:</strong> {evidencia.tipoEvidencia}</Typography>
                <Typography variant="body1"><strong>Descripción:</strong> {evidencia.descripcion}</Typography>
                <Typography variant="body1"><strong>Fecha:</strong> {new Date(evidencia.fechaEvidencia).toLocaleDateString()}</Typography>
                <Button variant="text" href={evidencia.archivo} target="_blank">
                  Ver Archivo
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AgregarEvidencia;
