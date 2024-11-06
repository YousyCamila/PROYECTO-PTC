import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, Divider, List, ListItem } from '@mui/material';
import EvidenciasCrud from './EvidenciasCrud';

const CasoDetailsMenu = ({ caso, onClose }) => {
  const [view, setView] = useState('details'); // Para cambiar entre vistas: detalles, evidencias, contrato, registro

  const handleViewDetails = () => {
    setView('details');
  };

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
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Evidencias
            </Typography>
            <EvidenciasCrud evidencias={caso.evidencias} casoId={caso._id} />
          </Box>
        );
      case 'contrato':
        return <Typography variant="body1">Contrato en construcción...</Typography>;
      case 'registro':
        return <Typography variant="body1">Registros de casos en construcción...</Typography>;
      default:
        return (
          <Box>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Detalles del Caso: {caso.nombreCaso}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>ID del Caso:</strong> {caso._id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Estado:</strong> {caso.activo ? 'Activo' : 'Inactivo'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Detective Asignado:</strong> {caso.idDetective?.nombre || 'No asignado'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Evidencias:</strong>
              {caso.evidencias && caso.evidencias.length > 0 ? (
                <ul>
                  {caso.evidencias.map((evidencia, index) => (
                    <li key={index}>
                      Fecha: {new Date(evidencia.fechaEvidencia).toLocaleDateString()}, Descripción: {evidencia.descripcion}, Tipo: {evidencia.tipoEvidencia}
                    </li>
                  ))}
                </ul>
              ) : (
                'No hay evidencias asociadas.'
              )}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
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
        <Box sx={{ width: '250px', backgroundColor: '#333', color: '#fff', padding: 3 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>Opciones del Caso</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            onClick={handleViewDetails}
          >
            Ver Detalles del Caso
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            onClick={handleViewEvidencias}
          >
            Ver Evidencias
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            onClick={handleViewContrato}
          >
            Ver Contrato
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            onClick={handleViewRegistroCasos}
          >
            Ver Registros del Caso
          </Button>
        </Box>

        {/* Área de contenido */}
        <Box sx={{ flex: 1, padding: 4 }}>
          <DialogContent>
            {renderContent()}
          </DialogContent>
        </Box>
      </Box>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#8A2BE2' }}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CasoDetailsMenu;
