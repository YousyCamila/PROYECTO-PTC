import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import EvidenciasCrud from './evidencias/EvidenciasCrud';
import RegistrosCrud from './registros/RegistrosCrud';

const CasoDetailsMenu = ({ caso, onClose }) => {
  const [view, setView] = useState('details');
  const navigate = useNavigate();
  const [historial, setHistorial] = useState(null);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  const handleViewDetails = () => setView('details');
  const handleViewEvidencias = () => setView('evidencias');
  const handleViewContrato = () => setView('contrato');
  const handleViewRegistros = () => setView('registros');

  const renderContent = () => {
    switch (view) {
      case 'evidencias':
        return (
          <Box>
            <Typography variant="h6" gutterBottom> Evidencias del Caso </Typography>
            <EvidenciasCrud casoId={caso._id} />
          </Box>
        );
      case 'contrato':
        return (
          <Box>
            <Typography variant="h6" gutterBottom> Contratos Asociados </Typography>
            {caso.contratos?.length > 0 ? (
              <ul>
                {caso.contratos.map((contrato, index) => (
                  <li key={index}>
                    <strong>Descripción:</strong> {contrato.descripcionServicio || 'Sin descripción'},
                    <strong> Estado:</strong> {contrato.estado || 'No definido'}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No hay contratos asociados.</Typography>
            )}
          </Box>
        );
      case 'registros':
        return (
          <Box>
            <Typography variant="h6" gutterBottom> Registros del Caso </Typography>
            <RegistrosCrud casoId={caso._id} />
          </Box>
        );

      default:
        return (
          <Box sx={{ px: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#005f91' }}>
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
              <strong>Detective Asignado:</strong> {caso.idDetective?.nombres || 'No asignado'}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ display: 'flex', minHeight: '60vh' }}>
        {/* Menú lateral */}
        <Box sx={{ width: '250px', backgroundColor: '#005f91', color: '#ffffff', padding: 3, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Opciones del Caso</Typography>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewDetails}>
            Ver Detalles del Caso
          </Button>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewEvidencias}>
            Ver Evidencias
          </Button>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewContrato}>
            Ver Contrato
          </Button>
          <Button fullWidth variant="outlined" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewRegistros}>
            Ver Registros del Caso
          </Button>
        </Box>

        {/* Área de contenido */}
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

export default CasoDetailsMenu;
