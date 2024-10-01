import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearCaso = () => {
  const [formData, setFormData] = useState({
    nombreCaso: '',
    idCliente: '',
    idDetective: '',
  });

  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clientes y detectives para los selects
    const fetchClientesYDetectives = async () => {
      try {
        const responseClientes = await fetch('http://localhost:3000/api/clientes');
        const responseDetectives = await fetch('http://localhost:3000/api/detectives');
        const clientesData = await responseClientes.json();
        const detectivesData = await responseDetectives.json();

        setClientes(clientesData);
        setDetectives(detectivesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de clientes o detectives.',
        });
      }
    };

    fetchClientesYDetectives();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/caso", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Caso creado exitosamente',
          text: 'El caso ha sido creado correctamente.',
        });
        navigate('/gestionar-casos'); // Redirige a la lista de casos
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el caso.',
        });
      }
    } catch (error) {
      console.error('Error al crear el caso:', error);
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
          Crear Caso
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="cliente-label">Cliente</InputLabel>
            <Select
              labelId="cliente-label"
              name="idCliente"
              value={formData.idCliente}
              onChange={handleChange}
              required
            >
              {clientes.map(cliente => (
                <MenuItem key={cliente._id} value={cliente._id}>
                  {cliente.nombres} {cliente.apellidos}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="detective-label">Detective</InputLabel>
            <Select
              labelId="detective-label"
              name="idDetective"
              value={formData.idDetective}
              onChange={handleChange}
            >
              <MenuItem value="">Sin Asignar</MenuItem>
              {detectives.map(detective => (
                <MenuItem key={detective._id} value={detective._id}>
                  {detective.nombres} {detective.apellidos}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
          >
            Crear Caso
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default CrearCaso;
