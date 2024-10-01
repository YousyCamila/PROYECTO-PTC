import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearContrato = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descripcionServicio: '',
    fechaInicio: '',
    fechaCierre: '',
    clausulas: '',
    tarifa: '',
    estado: true,
    idCliente: '',
    idDetective: '',
  });

  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clientes");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de clientes.',
        });
      }
    };

    const fetchDetectives = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/detectives");
        const data = await response.json();
        setDetectives(data);
      } catch (error) {
        console.error("Error fetching detectives:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de detectives.',
        });
      }
    };

    fetchClientes();
    fetchDetectives();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para la tarifa: solo permitir números
    if (name === 'tarifa' && /[^0-9]/.test(value)) {
      Swal.fire({
        icon: 'warning',
        title: 'Entrada no válida',
        text: 'La tarifa debe ser un número sin puntos ni comas.',
      });
      return; // No actualizar el estado si la entrada es inválida
    }

    setFormData({ ...formData, [name]: value });
  };

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
      const response = await fetch("http://localhost:3000/api/contratos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tarifa: numericTarifa, // Guardar la tarifa como número
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Contrato creado',
          text: 'El contrato se ha creado exitosamente.',
        });
        navigate('/gestionar-contratos'); // Redirigir a la lista de contratos
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo crear el contrato.',
        });
      }
    } catch (error) {
      console.error('Error al crear contrato:', error);
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
          Crear Contrato
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
            type="text" // Cambiar a text para evitar validaciones de número
            margin="normal"
            value={formData.tarifa}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <MenuItem value={true}>Activo</MenuItem>
              <MenuItem value={false}>Inactivo</MenuItem>
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
              {clientes.map((cliente) => (
                <MenuItem key={cliente._id} value={cliente._id}>
                  {cliente.nombres} {cliente.apellidos}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="detective-label">Detective (opcional)</InputLabel>
            <Select
              labelId="detective-label"
              name="idDetective"
              value={formData.idDetective}
              onChange={handleChange}
            >
              {detectives.map((detective) => (
                <MenuItem key={detective._id} value={detective._id}>
                  {detective.nombres} {detective.apellidos}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
          >
            Crear Contrato
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)} // Navegar hacia atrás
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
      </Container>
    </Box>
  );
};

export default CrearContrato;
