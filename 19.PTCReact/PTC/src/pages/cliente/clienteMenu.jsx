import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CasoDetailsMenu from './CasoDetailsMenu';

const ClienteMenu = () => {
  const [casos, setCasos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [clienteId, setClienteId] = useState('');
  const [selectedCaso, setSelectedCaso] = useState(null); // Caso seleccionado para ver detalles
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Obtiene el ID del cliente desde el localStorage
  const API_URL = 'http://localhost:3000/api';

  const fetchCasos = async (id) => {
    try {
      const response = await fetch(`${API_URL}/caso/cliente/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        setCasos(data);
      } else {
        throw new Error(data.message || 'Error al buscar los casos');
      }
    } catch (error) {
      console.error("Error fetching casos:", error);
      setSnackbarMessage(`Error al buscar los casos: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  const handleBuscarCasoPorId = () => {
    if (clienteId) {
      fetchCasos(clienteId);
      setOpenDialog(false);
    } else {
      setSnackbarMessage("Por favor ingresa un ID de cliente.");
      setOpenSnackbar(true);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Redirige al login
  };

  const handleOpenCasoDetails = (caso) => {
    setSelectedCaso(caso); // Guardar el caso seleccionado
  };

  const handleCloseCasoDetails = () => {
    setSelectedCaso(null); // Cerrar el menú de detalles del caso
  };

  const handleViewDetails = (caso) => {
    const evidenciasFormatted = caso.evidencias && caso.evidencias.length > 0 
      ? caso.evidencias.map((evidencia, index) => `
          <li>
            <strong>Fecha:</strong> ${evidencia.fechaEvidencia}, 
            <strong>Descripción:</strong> ${evidencia.descripcion}, 
            <strong>Tipo:</strong> ${evidencia.tipoEvidencia}
          </li>
        `).join('')
      : 'No hay evidencias asociadas.';
  
    Swal.fire({
      title: `Detalles del Caso: ${caso.nombreCaso}`, 
      html: `
        <div><strong>Nombre del Caso:</strong> ${caso.nombreCaso}</div>
        <div><strong>Estado:</strong> ${caso.activo ? 'Activo' : 'Inactivo'}</div>
        <div><strong>ID del Caso:</strong> ${caso._id}</div>
        <div><strong>Detective Asignado:</strong> ${caso.idDetective ? caso.idDetective.nombre : 'No asignado'}</div>
        <div><strong>Evidencias:</strong><ul>${evidenciasFormatted}</ul></div>
        <div><strong>Registro de Casos:</strong> ${caso.registroCasos && caso.registroCasos.length > 0 ? caso.registroCasos.join(', ') : 'No hay registros asociados.'}</div>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };
  

  useEffect(() => {
    if (userId) {
      fetchCasos(userId); // Cargar los casos automáticamente si el userId está definido
    }
  }, [userId]);

  return (
    <Box sx={{ width: '100vw', height: '100vh', background: 'linear-gradient(to right, #ffffff, #e0e0e0)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {/* Botón de "Salir" en la esquina superior izquierda con estilo visible */}
      <Button
        variant="contained"
        onClick={handleBackToLogin}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#ffffff', // Cambia el texto a color azul
          backgroundColor: '#005f91', // Fondo en blanco
          '&:hover': {
            backgroundColor: '#d9d9d9', // Cambia ligeramente el color al pasar el ratón
          },
        }}
        >
        Salir
      </Button>

      <Container maxWidth="lg" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#000000' }}>
          Casos Asociados al Cliente
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => fetchCasos(userId)}>
            Cargar Casos Asociados
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>
            Buscar Caso por ID de Cliente
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Nombre del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>ID del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casos.length > 0 ? (
                casos.map((caso) => (
                  <TableRow key={caso._id}>
                    <TableCell>{caso.nombreCaso}</TableCell>
                    <TableCell>{caso.activo ? 'Activo' : 'Inactivo'}</TableCell>
                    <TableCell>{caso._id}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewDetails(caso)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleOpenCasoDetails(caso)}>
                        <MenuOpenIcon color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    No hay casos asociados para este cliente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Cargar casos mediante ID de Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID de Cliente"
            type="text"
            fullWidth
            variant="outlined"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleBuscarCasoPorId} color="primary">Buscar</Button>
        </DialogActions>
      </Dialog>

      {selectedCaso && (
        <CasoDetailsMenu
          caso={selectedCaso}
          onClose={handleCloseCasoDetails}
        />
      )}
    </Box>
  );
};

export default ClienteMenu;
