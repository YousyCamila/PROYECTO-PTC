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
  Grid,
  Paper,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import generarPDF from './generarPDF'

const CrearContrato = () => {
  const navigate = useNavigate();

  // Estado inicial expandido
  const [formData, setFormData] = useState({
    descripcionServicio: '',
    fechaInicio: '',
    fechaCierre: '',
    clausulas: '',
    tarifa: '',
    estado: true,
    idCliente: '',
    idDetective: '',
    cliente: null,
    detective: null,
    metodoPago: '', // Nuevo campo
    tipoTarifa: '', // Nuevo campo
    plazosPago: '', // Nuevo campo
  });

  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const [loading, setLoading] = useState(true);

  // Métodos de pago predefinidos
  const metodosPago = [
    'Transferencia Bancaria',
    'Pago en Efectivo',
    'Tarjeta de Crédito',
    'Cheque'
  ];

  const tiposTarifa = [
    'Tarifa Fija',
    'Tarifa por Hora',
    'Tarifa por Proyecto'
  ];


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [clientesResponse, detectivesResponse] = await Promise.all([
          fetch("http://localhost:3000/api/clientes"),
          fetch("http://localhost:3000/api/detectives"),
        ]);
  
        if (!clientesResponse.ok || !detectivesResponse.ok) {
          throw new Error('Error al cargar los datos');
        }
  
        const clientesData = await clientesResponse.json();
        const detectivesData = await detectivesResponse.json();

        const clientesActivos = clientesData.filter(cliente => cliente.activo);
        const detectivesActivos = detectivesData.filter(detective => detective.activo);
  
        setClientes(clientesActivos);
        setDetectives(detectivesActivos);
  
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error de Carga',
          text: 'No se pudieron cargar los datos. Por favor, reintente.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones más robustas
    if (name === 'tarifa') {
      const numValue = value.replace(/[^\d.]/g, '');
      if (numValue.split('.').length > 2) return; // Prevenir múltiples puntos
      setFormData({ ...formData, [name]: numValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleClienteChange = (e) => {
    const selectedCliente = clientes.find((cliente) => cliente._id === e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      idCliente: e.target.value,
      cliente: selectedCliente,
    }));
  };

  const handleDetectiveChange = (e) => {
    const selectedDetective = detectives.find((detective) => detective._id === e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      idDetective: e.target.value,
      detective: selectedDetective,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'descripcionServicio',
      'fechaInicio',
      'fechaCierre',
      'tarifa',
      'idCliente',
      'metodoPago',
      'tipoTarifa'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Incompletos',
          text: `Por favor complete el campo: ${field}`
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el contrato');
      }
  
      // Llamar a la función que genera el PDF
      generarPDF(formData); // Aquí le pasas los datos del formulario
  
      Swal.fire({
        icon: 'success',
        title: 'Contrato Creado',
        text: 'El contrato se ha generado exitosamente.',
      });
  
      // Opcional: navegar después de crear
      navigate('/gestionar-contratos');
  
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  };
  

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(to right, #0077b6, #00b4d8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#0077b6",
              mb: 3
            }}
          >
            Crear Nuevo Contrato de Investigación
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="cliente-label">Cliente *</InputLabel>
                  <Select
                    labelId="cliente-label"
                    name="idCliente"
                    value={formData.idCliente}
                    onChange={handleClienteChange}
                    required
                  >
                    {clientes.map((cliente) => (
                      <MenuItem key={cliente._id} value={cliente._id}>
                        {cliente.nombres} {cliente.apellidos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="detective-label">Detective (opcional)</InputLabel>
                  <Select
                    labelId="detective-label"
                    name="idDetective"
                    value={formData.idDetective}
                    onChange={handleDetectiveChange}
                  >
                    {detectives.map((detective) => (
                      <MenuItem key={detective._id} value={detective._id}>
                        {detective.nombres} {detective.apellidos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Descripción del Servicio *"
                  name="descripcionServicio"
                  margin="normal"
                  value={formData.descripcionServicio}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha de Inicio *"
                  type="date"
                  name="fechaInicio"
                  margin="normal"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha de Cierre *"
                  type="date"
                  name="fechaCierre"
                  margin="normal"
                  value={formData.fechaCierre}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Método de Pago *</InputLabel>
                  <Select
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleChange}
                    required
                  >
                    {metodosPago.map(metodo => (
                      <MenuItem key={metodo} value={metodo}>{metodo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Tipo de Tarifa *</InputLabel>
                  <Select
                    name="tipoTarifa"
                    value={formData.tipoTarifa}
                    onChange={handleChange}
                    required
                  >
                    {tiposTarifa.map(tipo => (
                      <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tarifa *"
                  name="tarifa"
                  type="text"
                  margin="normal"
                  value={formData.tarifa}
                  onChange={handleChange}
                  required
                  helperText="Solo números, use punto para decimales"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cláusulas Adicionales"
                  name="clausulas"
                  margin="normal"
                  value={formData.clausulas}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} container justifyContent="center" spacing={2}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#0077b6",
                      "&:hover": { backgroundColor: "#005f91" }
                    }}
                  >
                    Crear Contrato
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{
                      color: '#0077b6',
                      borderColor: '#0077b6',
                      '&:hover': { backgroundColor: '#e0e0e0' },
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CrearContrato;