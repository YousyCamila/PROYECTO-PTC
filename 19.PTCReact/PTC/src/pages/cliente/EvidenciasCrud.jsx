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
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const EvidenciasCrud = ({ casoId }) => {
  const [evidencias, setEvidencias] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvidencia, setSelectedEvidencia] = useState(null);
  const navigate = useNavigate();

  // Fetch evidencias al cargar el componente
  useEffect(() => {
    const fetchEvidencias = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/evidencias/caso/${casoId}`);
        if (response.ok) {
          const data = await response.json();
          setEvidencias(data.evidencias);
        } else {
          console.error('Error al obtener evidencias:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchEvidencias();
  }, [casoId]);

  const handleViewEvidencia = (evidencia) => {
    setSelectedEvidencia(evidencia);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvidencia(null);
  };

  const handleAddEvidencia = () => {
    navigate(`/agregar-evidencia/${casoId}`); // Incluye el casoId en la ruta
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Evidencias del Caso
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddEvidencia}
        sx={{ mb: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
      >
        Agregar Evidencia
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evidencias.length > 0 ? (
              evidencias.map((evidencia, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(evidencia.fechaEvidencia).toLocaleDateString()}</TableCell>
                  <TableCell>{evidencia.descripcion}</TableCell>
                  <TableCell>{evidencia.tipoEvidencia}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewEvidencia(evidencia)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                  No hay evidencias asociadas a este caso.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles de la Evidencia</DialogTitle>
        <DialogContent>
          {selectedEvidencia ? (
            <>
              <Typography variant="body1"><strong>Fecha:</strong> {new Date(selectedEvidencia.fechaEvidencia).toLocaleString()}</Typography>
              <Typography variant="body1"><strong>Descripción:</strong> {selectedEvidencia.descripcion}</Typography>
              <Typography variant="body1"><strong>Tipo de Evidencia:</strong> {selectedEvidencia.tipoEvidencia}</Typography>
            </>
          ) : (
            <Typography>No se seleccionó ninguna evidencia.</Typography>
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

export default EvidenciasCrud;
