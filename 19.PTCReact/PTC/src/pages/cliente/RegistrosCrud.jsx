import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const RegistrosCrud = ({ casoId }) => {
  const [registros, setRegistros] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const navigate = useNavigate();

  // URL base del backend
  const backendUrl = 'http://localhost:3000';

  // Fetch registros al cargar el componente
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/registros-caso/caso/${casoId}`);
        if (response.ok) {
          const data = await response.json();
          setRegistros(data);
        } else {
          console.error('Error al obtener registros:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchRegistros();
  }, [casoId]);

  const handleViewRegistro = (registro) => {
    setSelectedRegistro(registro);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRegistro(null);
  };

  const handleAddRegistro = () => {
    navigate(`/agregar-registros/${casoId}`); // Incluye el casoId en la ruta
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Registros del Caso
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddRegistro}
        sx={{ mb: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
      >
        Agregar Registro
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.length > 0 ? (
              registros.map((registro, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(registro.fechaInicio).toLocaleDateString()}</TableCell>
                  <TableCell>{registro.descripcion}</TableCell>
                  <TableCell>{registro.estadoRegistro}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewRegistro(registro)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                  No hay registros asociados a este caso.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Registro</DialogTitle>
        <DialogContent>
          {selectedRegistro ? (
            <>
              <Typography variant="body1"><strong>Fecha:</strong> {new Date(selectedRegistro.fechaInicio).toLocaleString()}</Typography>
              <Typography variant="body1"><strong>Descripción:</strong> {selectedRegistro.descripcion}</Typography>
              <Typography variant="body1"><strong>Estado:</strong> {selectedRegistro.estadoRegistro}</Typography>
            </>
          ) : (
            <Typography>No se seleccionó ningún registro.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegistrosCrud;
