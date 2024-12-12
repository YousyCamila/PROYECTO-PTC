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
  Divider,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditarRegistroFormDetective = () => {
  const { registroId } = useParams(); // Obtener el registroId desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descripcion: '',
    fechaInicio: '',
    fechaFinalizacion: '',
    estadoRegistro: '',
    seguimientoPorcentaje: '',
    idCliente: '',
    idDetective: '',
  });

  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);

  const estadosRegistro = ['Comenzando', 'En Progreso', 'Finalizando'];

  // Fetch datos del registro
  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/registros-caso/${registroId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...data,
            fechaInicio: data.fechaInicio.split('T')[0], // Formatear fecha para el input
            fechaFinalizacion: data.fechaFinalizacion ? data.fechaFinalizacion.split('T')[0] : '',
          });
        } else {
          console.error('Error al cargar el registro:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchRegistro();
  }, [registroId]);

  // Fetch clientes y detectives
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesResponse, detectivesResponse] = await Promise.all([
          fetch('http://localhost:3000/api/clientes'),
          fetch('http://localhost:3000/api/detectives'),
        ]);

        if (clientesResponse.ok && detectivesResponse.ok) {
          const clientesData = await clientesResponse.json();
          const detectivesData = await detectivesResponse.json();
          setClientes(clientesData);
          setDetectives(detectivesData);
        } else {
          console.error('Error al cargar clientes o detectives');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios en los campos de texto y selección
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/registros-caso/${registroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Actualizado',
          text: 'El registro se ha actualizado exitosamente.',
        });
        navigate(`/cliente-menu`); // Redirigir a la lista de registros
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'No se pudo actualizar el registro.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar registro:', error);
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
        Editar Registro
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
          label="Fecha de Finalización"
          type="date"
          name="fechaFinalizacion"
          margin="normal"
          value={formData.fechaFinalizacion}
          onChange={handleChange}
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
        <TextField
          fullWidth
          label="Seguimiento (%)"
          name="seguimientoPorcentaje"
          margin="normal"
          type="number"
          value={formData.seguimientoPorcentaje || ''}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="cliente-label" sx={{ color: '#005f91' }}>
            Cliente
          </InputLabel>
          <Select
            labelId="cliente-label"
            name="idCliente"
            value={formData.idCliente || ''}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            <MenuItem value="">
              Ninguno
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente._id} value={cliente._id}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="detective-label" sx={{ color: '#005f91' }}>
            Detective (Opcional)
          </InputLabel>
          <Select
            labelId="detective-label"
            name="idDetective"
            value={formData.idDetective || ''}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            <MenuItem value="">
              Ninguno
            </MenuItem>
            {detectives.map((detective) => (
              <MenuItem key={detective._id} value={detective._id}>
                {detective.nombre}
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
            Actualizar Registro
          </Button>
          <Button
            onClick={() => navigate(`/cliente-menu`)}
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

export default EditarRegistroFormDetective;