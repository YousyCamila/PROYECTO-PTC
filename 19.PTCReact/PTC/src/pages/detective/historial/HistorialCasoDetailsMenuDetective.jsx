import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  CircularProgress,
} from '@mui/material';
import NovedadesHistorial from '../auditoria/NovedadesHistorial';
//import InformacionHistorial from './InformacionHistorial';
//import GestionarHistorial from './GestionarHistorial';
import GestionarHistorialDetective from './GestionarHistorialDetective';
import InformacionHistorial from '../../cliente/historial/InformacionHistorial';


const HistorialCasoDetailsMenuDetective = ({ caso, onClose }) => {
  const [view, setView] = useState('resumen');
  const [historial, setHistorial] = useState(null);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  const handleViewResumen = () => setView('resumen');
  const handleViewNovedades = () => setView('novedades');
  const handleViewHistorial = () => {
    setView('historial');
    fetchHistorial();
  };

  useEffect(() => {
    fetchHistorial();
  }, [caso]);

  const fetchHistorial = async () => {
    if (!caso || !caso._id) return;
    setLoadingHistorial(true);
    try {
      const response = await fetch(`http://localhost:3000/api/historiales/caso/${caso._id}`);
      console.log('📘 Obteniendo historial del caso:', caso._id);
      const data = await response.json();
      if (response.ok) {
        setHistorial(data);
      } else {
        console.error('Error al obtener historial:', data.message);
        setHistorial(null);
      }
    } catch (err) {
      console.error('Error al obtener historial:', err);
      setHistorial(null);
    } finally {
      setLoadingHistorial(false);
    }
  };

  const renderContent = () => {
    if (loadingHistorial) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!historial) {
      return <Typography>No se pudo cargar el historial.</Typography>;
    }

    switch (view) {
      case 'resumen':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Información general del Historial</Typography>
            <Divider sx={{ mb: 2 }} />
            <InformacionHistorial historial={historial} />
          </Box>
        );
        case 'novedades':
          return (
            <NovedadesHistorial
              historial={historial}
              onActualizar={fetchHistorial}
            />
          );
      case 'historial':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Historial Completo del Caso</Typography>
            <Divider sx={{ mb: 2 }} />
            <GestionarHistorialDetective historial={historial} />
          </Box>
        );
      default:
        return <Typography>Selecciona una vista válida.</Typography>;
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ display: 'flex', minHeight: '60vh' }}>
        {/* Menú lateral */}
        <Box sx={{ width: '250px', backgroundColor: '#005f91', color: '#ffffff', padding: 3, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Historial del Caso</Typography>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewResumen}>
            Información general
          </Button>
          <Button fullWidth variant="outlined" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewNovedades}>
            Auditoria
          </Button>
          <Button fullWidth variant="outlined" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewHistorial}>
            Gestionar Historial
          </Button>
          <Divider sx={{ my: 2, borderColor: '#ffffff' }} />
          <Button fullWidth variant="outlined" sx={{ backgroundColor: '#ffffff', color: '#005f91' }} onClick={fetchHistorial}>
            Recargar Historial
          </Button>
        </Box>

        {/* Área de contenido dinámico */}
        <Box sx={{ flex: 1, padding: 4, backgroundColor: '#f5faff' }}>
          <DialogContent>{renderContent()}</DialogContent>
        </Box>
      </Box>

      <DialogActions sx={{ backgroundColor: '#f5faff', padding: 2 }}>
        <Button onClick={onClose} sx={{ color: '#005f91', fontWeight: 'bold' }}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistorialCasoDetailsMenuDetective;
