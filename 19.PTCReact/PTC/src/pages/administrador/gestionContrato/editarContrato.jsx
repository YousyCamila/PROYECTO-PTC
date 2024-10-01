import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const EditarContrato = () => {
  const { id } = useParams(); // Obtener el ID del contrato de la URL
  const navigate = useNavigate(); // Inicializa el hook para la navegación

  const [formData, setFormData] = useState({
    descripcionServicio: '',
    fechaInicio: '',
    fechaCierre: '',
    clausulas: '',
    tarifa: '',
    estado: true,
    idCliente: '', // Guardar el ID del cliente, solo lectura
    idDetective: '', // Guardar el ID del detective, solo lectura
  });

  // Fetch del contrato por ID
  useEffect(() => {
    const fetchContrato = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/contratos/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Verifica si se encontró el contrato y establece los datos en el formulario
        if (data) {
          setFormData({
            descripcionServicio: data.descripcionServicio,
            fechaInicio: new Date(data.fechaInicio).toISOString().split('T')[0],
            fechaCierre: new Date(data.fechaCierre).toISOString().split('T')[0],
            clausulas: data.clausulas || '',
            tarifa: data.tarifa,
            estado: data.estado,
            idCliente: data.idCliente._id, // Guarda solo el ID del cliente
            idDetective: data.idDetective ? data.idDetective._id : '', // Guarda solo el ID del detective
          });
        }
      } catch (error) {
        console.error('Error fetching contrato:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del contrato: ' + error.message,
        });
      }
    };

    fetchContrato();
  }, [id]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar el formulario para actualizar el contrato
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir la tarifa a número (asegurarse de que sea un número)
    const numericTarifa = parseFloat(formData.tarifa);
    if (isNaN(numericTarifa)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La tarifa debe ser un número válido.',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/contratos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcionServicio: formData.descripcionServicio,
          fechaInicio: formData.fechaInicio,
          fechaCierre: formData.fechaCierre,
          clausulas: formData.clausulas,
          tarifa: numericTarifa,
          estado: formData.estado,
          // No incluir idCliente ni idDetective aquí
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Contrato actualizado',
          text: 'El contrato se ha actualizado exitosamente.',
        });
        navigate('/gestionar-contratos'); // Redirigir a la lista de contratos
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar el contrato.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar contrato:', error);
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
          Editar Información del Contrato
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Descripción del Servicio"
            name="descripcionServicio"
            margin="normal"
            value={formData.descripcionServicio}
            onChange={handleChange}
            required
          />
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
            label="Fecha de Cierre"
            type="date"
            name="fechaCierre"
            margin="normal"
            value={formData.fechaCierre}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Cláusulas"
            name="clausulas"
            margin="normal"
            value={formData.clausulas}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Tarifa"
            name="tarifa"
            type="number"
            margin="normal"
            value={formData.tarifa}
            onChange={handleChange}
            required
          />

          {/* Mostrar Cliente y Detective */}
          <TextField
            fullWidth
            label="ID Cliente"
            margin="normal"
            value={formData.idCliente} // Mostrar el ID del cliente
            InputProps={{
              readOnly: true, // Campo solo lectura
            }}
          />
          <TextField
            fullWidth
            label="ID Detective (opcional)"
            margin="normal"
            value={formData.idDetective} // Mostrar el ID del detective
            InputProps={{
              readOnly: true, // Campo solo lectura
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

export default EditarContrato;
