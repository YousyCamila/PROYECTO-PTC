import React, { useContext, useState, useEffect } from 'react';
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
  Tooltip,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const DetectiveMenu = () => {
  const { user } = useContext(AuthContext);
  const [casos, setCasos] = useState([]);
  const [selectedCaso, setSelectedCaso] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [contratoId, setContratoId] = useState('');
  const [error, setError] = useState('');

  if (!user || user.role !== 'detective') {
    return <Typography variant="h6" color="error">Acceso denegado. Solo los detectives pueden acceder a este menú.</Typography>;
  }

  // Función para obtener los casos asignados al detective
  const fetchCasos = async () => {
    try {
      const response = await fetch(`/api/casos/detector/${user._id}`); // Cambia esta URL según tu API
      if (!response.ok) throw new Error('Error al cargar casos');
      const data = await response.json();
      setCasos(data);
    } catch (error) {
      setError(error.message);
      setSnackbarMessage(`Error: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  // Manejar la apertura de los detalles del caso
  const handleOpenCasoDetails = (caso) => {
    setSelectedCaso(caso);
  };

  useEffect(() => {
    if (user) {
      fetchCasos();
    }
  }, [user]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          background: 'white',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          marginTop: '80px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#000000' }}>
          Casos Asociados al Detective
        </Typography>

        <Button variant="outlined" color="primary" onClick={fetchCasos} sx={{ mb: 2 }}>
          Cargar Casos Asignados
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Nombre del Caso
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Cliente Asociado
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Estado
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casos.length > 0 ? (
                casos.map((caso) => (
                  <TableRow key={caso._id}>
                    <TableCell>{caso.nombreCaso}</TableCell>
                    <TableCell>{caso.cliente ? `${caso.cliente.nombre} ${caso.cliente.apellido}` : 'No asignado'}</TableCell>
                    <TableCell>{caso.estado ? 'Activo' : 'Inactivo'}</TableCell>
                    <TableCell>
                      <Tooltip title="Ver detalles del caso" arrow>
                        <IconButton onClick={() => handleOpenCasoDetails(caso)}>
                          <MenuOpenIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    No hay casos asociados para este detective.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Container>

      {selectedCaso && (
        <Dialog open={Boolean(selectedCaso)} onClose={() => setSelectedCaso(null)}>
          <DialogTitle>Detalles del Caso</DialogTitle>
          <DialogContent>
            <Typography variant="body1"><strong>Nombre:</strong> {selectedCaso.nombreCaso}</Typography>
            <Typography variant="body1"><strong>Cliente:</strong> {selectedCaso.cliente?.nombre} {selectedCaso.cliente?.apellido}</Typography>
            <Typography variant="body1"><strong>Estado:</strong> {selectedCaso.estado ? 'Activo' : 'Inactivo'}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedCaso(null)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default DetectiveMenu;
