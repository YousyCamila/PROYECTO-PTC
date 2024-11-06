import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, Divider } from '@mui/material';
import EvidenciasCrud from './EvidenciasCrud';

const CasoDetailsMenu = ({ caso, onClose }) => {
  const [view, setView] = useState('details'); // Para cambiar entre vistas: detalles, evidencias, contrato, registro

  const handleViewEvidencias = () => {
    setView('evidencias');
  };

  const handleViewContrato = () => {
    setView('contrato');
  };

  const handleViewRegistroCasos = () => {
    setView('registro');
  };

  const renderContent = () => {
    switch (view) {
      case 'evidencias':
        return <EvidenciasCrud evidencias={caso.evidencias} casoId={caso._id} />;
      case 'contrato':
        return <Typography variant="body1">Contrato en construcción...</Typography>;
      case 'registro':
        return <Typography variant="body1">Registros de casos en construcción...</Typography>;
      default:
        return (
          <Box sx={{ px: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#004c7f' }}>
              Detalles del Caso: {caso.nombreCaso}
            </Typography>
            <Divider sx={{ mb: 2, backgroundColor: '#d1e0e5' }} />
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>ID del Caso:</strong> {caso._id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Estado:</strong> {caso.activo ? 'Activo' : 'Inactivo'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Detective Asignado:</strong> {caso.idDetective?.nombre || 'No asignado'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Evidencias:</strong> {caso.evidencias && caso.evidencias.length > 0 ? caso.evidencias.join(', ') : 'No hay evidencias asociadas.'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Registro de Casos:</strong> {caso.registroCasos && caso.registroCasos.length > 0 ? caso.registroCasos.join(', ') : 'No hay registros asociados.'}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ display: 'flex', minHeight: '60vh' }}>
        {/* Menú lateral */}
        <Box sx={{ width: '250px', backgroundColor: '#003b5c', color: '#ffffff', padding: 3, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Opciones del Caso</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: '#ffffff',
              color: '#003b5c',
              fontWeight: 'bold',
              boxShadow: 1,
              '&:hover': { backgroundColor: '#e0e0e0', color: '#005f91' },
            }}
            onClick={handleViewEvidencias}
          >
            Ver Evidencias
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: '#ffffff',
              color: '#003b5c',
              fontWeight: 'bold',
              boxShadow: 1,
              '&:hover': { backgroundColor: '#e0e0e0', color: '#005f91' },
            }}
            onClick={handleViewContrato}
          >
            Ver Contrato
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: '#ffffff',
              color: '#003b5c',
              fontWeight: 'bold',
              boxShadow: 1,
              '&:hover': { backgroundColor: '#e0e0e0', color: '#005f91' },
            }}
            onClick={handleViewRegistroCasos}
          >
            Ver Registros del Caso
          </Button>
        </Box>

        {/* Área de contenido */}
        <Box sx={{ flex: 1, padding: 4, backgroundColor: '#f5faff' }}>
          <DialogContent>
            {renderContent()}
          </DialogContent>
        </Box>
      </Box>

      <DialogActions sx={{ backgroundColor: '#f5faff', padding: 2 }}>
        <Button onClick={onClose} sx={{ color: '#003b5c', fontWeight: 'bold' }}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CasoDetailsMenu;
