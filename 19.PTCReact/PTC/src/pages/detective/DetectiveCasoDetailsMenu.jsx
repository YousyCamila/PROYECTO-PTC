import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const DetectiveCasoDetailsMenu = ({ caso, onClose }) => {
  const [view, setView] = useState('details');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleViewDetails = () => {
    setView('details');
  };

  const handleViewEvidencias = () => {
    setView('evidencias');
  };

  const handleViewRegistroCasos = () => {
    // Redirigir a la página de registroCaso
    navigate('/registroCaso'); // Asegúrate de que la ruta '/registroCaso' esté configurada en tu router
  };

  const renderContent = () => {
    switch (view) {
      case 'evidencias':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Evidencias
            </Typography>
            {/* Aquí iría el componente para manejar las evidencias */}
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
          </Box>
        );
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
              <strong>Cliente:</strong> {caso.cliente ? `${caso.cliente.nombre} ${caso.cliente.apellido}` : 'No asignado'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Detective Asignado:</strong> {caso.nombreDetective || 'No asignado'}
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
            onClick={handleViewDetails}
          >
            Ver Detalles del Caso
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
            onClick={handleViewRegistroCasos} // Redirige a la página de registroCaso
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
        <Button onClick={onClose} color="primary" variant="outlined">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetectiveCasoDetailsMenu;
