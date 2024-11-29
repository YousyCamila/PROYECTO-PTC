import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar';

const CrearCaso = () => {
  const [formData, setFormData] = useState({
    nombreCaso: '',
    idCliente: '',
    idDetective: '',
    nombreCliente: '',
    nombreDetective: '',
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

    // Si se selecciona cliente o detective, extraemos también su nombre
    if (name === 'idCliente') {
      const selectedCliente = clientes.find(cliente => cliente._id === value);
      setFormData({
        ...formData,
        idCliente: value,
        nombreCliente: selectedCliente ? `${selectedCliente.nombres} ${selectedCliente.apellidos}` : '',
      });
    } else if (name === 'idDetective') {
      const selectedDetective = detectives.find(detective => detective._id === value);
      setFormData({
        ...formData,
        idDetective: value,
        nombreDetective: selectedDetective ? `${selectedDetective.nombres} ${selectedDetective.apellidos}` : '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',  // Asegura que siempre ocupe al menos el 100% de la altura
        background: 'linear-gradient(to right, #006f8e, #0097b6)',
        paddingTop: 'px',
      }}
    >
      <NavbarSidebar /> {/* Navbar arriba */}

      <Box
        sx={{
          flex: 10,  // Permite que el contenido ocupe el espacio restante
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
                <MenuItem value="Cadena de custodia">Cadena de Custodia</MenuItem>
                <MenuItem value="Investigación de extorsión">Investigación de Extorsión</MenuItem>
                <MenuItem value="Estudios de seguridad">Estudios de Seguridad</MenuItem>
                <MenuItem value="Investigación de infidelidades">Investigación de Infidelidades</MenuItem>
                <MenuItem value="Investigación de robos empresariales">Investigación de Robos Empresariales</MenuItem>
                <MenuItem value="Antecedentes">Antecedentes</MenuItem>
                <MenuItem value="Recuperación de vehículos">Recuperación de Vehículos</MenuItem>
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
    </Box>
  );
};

export default CrearCaso;
