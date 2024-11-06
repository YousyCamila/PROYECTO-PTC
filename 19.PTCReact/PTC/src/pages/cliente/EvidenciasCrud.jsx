import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const EvidenciasCrud = ({ evidencias, casoId }) => {
  const navigate = useNavigate();

  const handleAgregarEvidencia = () => {
    navigate(`/agregar-evidencia/${casoId}`); // Redirige al componente de agregar evidencia pasando el ID del caso
  };

  const handleVerEvidencia = (evidenciaId) => {
    navigate(`/ver-evidencia/${evidenciaId}`); // Redirige a la vista de evidencia específica si tienes una ruta para ver evidencia específica
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Evidencias</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAgregarEvidencia}
        sx={{ mb: 2 }}
      >
        Agregar Evidencia
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID de Evidencia</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evidencias.length > 0 ? (
              evidencias.map((evidencia) => (
                <TableRow key={evidencia._id}>
                  <TableCell>{evidencia._id}</TableCell>
                  <TableCell>{evidencia.descripcion || 'Sin descripción'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleVerEvidencia(evidencia._id)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                  No hay evidencias asociadas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EvidenciasCrud;
    