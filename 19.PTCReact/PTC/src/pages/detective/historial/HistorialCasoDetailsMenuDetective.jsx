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
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';
import NovedadesHistorial from '../auditoria/NovedadesHistorial';
import GestionarHistorialDetective from './GestionarHistorialDetective';
import InformacionHistorial from '../../cliente/historial/InformacionHistorial';
import axios from 'axios';

const HistorialCasoDetailsMenuDetective = ({ caso, onClose }) => {
    const [view, setView] = useState('resumen');
    const [historial, setHistorial] = useState(null);
    const [loadingHistorial, setLoadingHistorial] = useState(false);
    const [showCreateAlert, setShowCreateAlert] = useState(false);
    const [createAlertMessage, setCreateAlertMessage] = useState('');
    const [isCreatingHistorial, setIsCreatingHistorial] = useState(false);
    const [showStartHistorialDialog, setShowStartHistorialDialog] = useState(false);
    const [nuevoNombreHistorial, setNuevoNombreHistorial] = useState('');
    const [hasCreatedHistorial, setHasCreatedHistorial] = useState(false); // Estado para controlar la creación única

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
                setHasCreatedHistorial(data !== null); // Si se encuentra historial, ya se creó
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

    const handleStartHistorial = () => {
        setShowStartHistorialDialog(true);
    };

    const handleCloseStartHistorialDialog = () => {
        setShowStartHistorialDialog(false);
        setNuevoNombreHistorial('');
    };

    const handleCrearNuevoHistorial = async () => {
        if (!caso || !caso._id) return;
        setIsCreatingHistorial(true);
        try {
            const response = await axios.post('http://localhost:3000/api/historiales', {
                idCaso: caso._id,
                nombreCliente: nuevoNombreHistorial, // Usamos el nombre ingresado
            });
            if (response.status === 201) {
                setCreateAlertMessage('Historial creado exitosamente.');
                setShowCreateAlert(true);
                setHasCreatedHistorial(true); // Marcamos que ya se creó el historial
                fetchHistorial(); // Recargamos el historial para mostrarlo
                handleCloseStartHistorialDialog();
            } else {
                setCreateAlertMessage('Error al crear el historial.');
                setShowCreateAlert(true);
            }
        } catch (error) {
            console.error('Error al crear el historial:', error);
            setCreateAlertMessage('Error al crear el historial.');
            setShowCreateAlert(true);
        } finally {
            setIsCreatingHistorial(false);
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

        if (!historial && !hasCreatedHistorial) {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                    <Typography variant="h6" gutterBottom>
                        Este caso aún no tiene historial.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleStartHistorial}>
                        Empezar mi historial
                    </Button>
                </Box>
            );
        }

        if (!historial && hasCreatedHistorial) {
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

            {/* Dialog para crear el historial */}
            <Dialog open={showStartHistorialDialog} onClose={handleCloseStartHistorialDialog}>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        Empezar Historial del Caso
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Ingrese un nombre para iniciar el historial de este caso. Puede editar más detalles posteriormente.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre-historial"
                        label="Nombre del Cliente"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={nuevoNombreHistorial}
                        onChange={(e) => setNuevoNombreHistorial(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStartHistorialDialog}>Cancelar</Button>
                    <Button onClick={handleCrearNuevoHistorial} disabled={isCreatingHistorial}>
                        {isCreatingHistorial ? <CircularProgress size={24} /> : 'Crear Historial'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes de creación */}
            <Snackbar
                open={showCreateAlert}
                autoHideDuration={3000}
                onClose={() => setShowCreateAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowCreateAlert(false)} severity={createAlertMessage.includes('éxito') ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {createAlertMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default HistorialCasoDetailsMenuDetective;