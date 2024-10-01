import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const DetectiveMenu = () => {
  const [contratos, setContratos] = useState([]);
  const [contratoId, setContratoId] = useState('');
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [casos, setCasos] = useState([]);

  // Función para obtener los contratos del detective
  const fetchContratos = async () => {
    try {
      const response = await fetch('/api/contratos'); // Cambia esta URL según tu API
      if (!response.ok) throw new Error('Error al cargar contratos');
      const data = await response.json();
      setContratos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para obtener un contrato por ID
  const fetchContratoById = async (id) => {
    const response = await fetch(`/api/contratos/${id}`);
    return response.ok ? await response.json() : null;
  };

  // Maneja la visualización del contrato
  const handleViewContracts = async (e) => {
    e.preventDefault();
    const contrato = await fetchContratoById(contratoId);

    if (contrato) {
      Swal.fire({
        title: `Detalles del Contrato: ${contrato.id}`,
        html: `
          <p><strong>ID:</strong> ${contrato._id}</p>
          <p><strong>Descripción del Servicio:</strong> ${contrato.descripcionServicio}</p>
          <p><strong>Fecha de Inicio:</strong> ${new Date(contrato.fechaInicio).toLocaleDateString()}</p>
          <p><strong>Fecha de Cierre:</strong> ${new Date(contrato.fechaCierre).toLocaleDateString()}</p>
          <p><strong>Cláusulas:</strong> ${contrato.clausulas || 'No hay cláusulas disponibles.'}</p>
          <p><strong>Tarifa:</strong> ${contrato.tarifa} (en la moneda correspondiente)</p>
          <p><strong>Estado:</strong> ${contrato.estado ? 'Activo' : 'Inactivo'}</p>
          <p><strong>Cliente Asociado:</strong> ${contrato.idCliente || 'No asignado'}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    } else {
      Swal.fire('No se encontró el contrato.');
    }
  };

  // Cargar contratos al montar el componente
  useEffect(() => {
    fetchContratos();
  }, []);

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
      <Container maxWidth="lg" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Casos Asociados al Detective
        </Typography>

        <Button variant="outlined" onClick={() => setOpenDialog(true)} sx={{ mb: 2, color: '#0077b6', borderColor: '#0077b6' }}>
          Agregar ID de Caso
        </Button>

        {/* Campo para ver contratos */}
        <form onSubmit={handleViewContracts} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <TextField
            label="ID del Contrato"
            value={contratoId}
            onChange={(e) => setContratoId(e.target.value)}
            margin="normal"
            required
            sx={{ flex: 1 }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}>
            Ver Contrato
          </Button>
        </form>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Nombre del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Cliente Asociado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>ID del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contratos.map((caso) => (
                <TableRow key={caso._id}>
                  <TableCell>{caso.nombreCaso}</TableCell>
                  <TableCell>{caso.idCliente ? `${caso.idCliente.nombres} ${caso.idCliente.apellidos}` : 'No asignado'}</TableCell>
                  <TableCell>{caso.activo ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell>{caso._id}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewContracts(caso._id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log("Agregar evidencia")}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="outlined" onClick={() => console.log("Volver")} sx={{ mt: 2, color: '#0077b6', borderColor: '#0077b6' }}>
          Volver
        </Button>

        {/* Dialog para agregar caso */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Agregar Caso por ID</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="ID del Caso"
              type="text"
              fullWidth
              variant="outlined"
              value={contratoId}
              onChange={(e) => setContratoId(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={() => console.log("Agregar Caso")}>Agregar</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default DetectiveMenu;
