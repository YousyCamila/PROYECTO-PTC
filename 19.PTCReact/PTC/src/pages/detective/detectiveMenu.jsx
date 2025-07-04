import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    IconButton,
    Tooltip,
    Button,
    CircularProgress,
    Fade,
    Zoom
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArticleIcon from '@mui/icons-material/Article';
import TermsIcon from '@mui/icons-material/Description';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoIcon from '@mui/icons-material/Info';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavbarSidebarDetective from './NavbarSidebarDetective';
import DetectiveCasoDetailsMenu from './caso/DetectiveCasoDetailsMenu';
import HistorialCasoDetailsMenuDetective from './historial/HistorialCasoDetailsMenuDetective';

// Paleta de colores
const primaryAccent = '#1e88e5';
const textPrimary = '#ffffff';
const textSecondary = '#333333';
const estadoAbierto = '#4caf50';
const estadoCerrado = '#e74c3c';
const backgroundLlamativo = '#f0f8ff';

// Estilos personalizados
const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: primaryAccent,
    color: textPrimary,
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transition: 'background-color 0.3s ease-in-out',
    },
}));

const EstadoBoton = styled(Box)(({ activo }) => ({
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: textPrimary,
    backgroundColor: activo ? estadoAbierto : estadoCerrado,
    fontSize: '0.9rem',
}));

const StyledFooter = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#000000',
    color: '#cccccc',
    padding: theme.spacing(2),
    textAlign: 'center',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
    zIndex: 1050,
    fontSize: '0.9rem',
    '& p': {
        transition: 'color 0.3s ease-in-out, text-shadow 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
        '&:hover': {
            color: textPrimary,
            textShadow: `0 0 5px ${textPrimary}`,
        },
    },
    '& button': {
        color: '#cccccc',
        textTransform: 'none',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: textPrimary,
        },
    },
}));

const DetectiveMenu = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = localStorage.getItem('email_detective');
    const API_URL = 'https://proyecto-ptc.onrender.com/api';

    const [casos, setCasos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedCaso, setSelectedCaso] = useState(null);
    const [selectedHistorialCaso, setSelectedHistorialCaso] = useState(null);

    useEffect(() => {
        if (email) {
            fetchCasos(email);
        }
    }, [email]);

    const fetchCasos = async (emailDetective) => {
        try {
            const response = await fetch(`${API_URL}/caso/detective/email/${emailDetective}`);
            const data = await response.json();
            if (response.ok) {
                setCasos(data.casos || []);
            } else {
                throw new Error(data.message || 'Error al buscar los casos');
            }
        } catch (error) {
            setSnackbarMessage(`Error: ${error.message}`);
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCasoDetails = (caso) => setSelectedCaso(caso);
    const handleOpenHistorial = (caso) => setSelectedHistorialCaso(caso);

    const footerText = (
        <>
            <InfoIcon /> El contenido de este sitio está sujeto a las condiciones aquí expuestas. <GavelIcon />
            Si no está de acuerdo con la <PolicyIcon /> política de privacidad, absténgase de utilizar este sitio. <HandshakeIcon />
        </>
    );

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '100vh',
                background: backgroundLlamativo,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '120px',
            }}
        >
            <NavbarSidebarDetective />

            <Container
                maxWidth="lg"
                sx={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: 8,
                    padding: 4,
                    marginTop: '80px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
            >
                <Fade in={true} timeout={500}>
                    <Typography variant="h4" align="center" fontWeight={700} color={textSecondary} gutterBottom>
                        Casos Asignados
                    </Typography>
                </Fade>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 4, maxHeight: '60vh' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre del Caso</StyledTableCell>
                                    <StyledTableCell>Cliente Asignado</StyledTableCell>
                                    <StyledTableCell align="center">Estado</StyledTableCell>
                                    <StyledTableCell align="right">Acciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {casos.length > 0 ? (
                                    casos.map((caso, index) => (
                                        <Zoom in={true} key={caso._id} style={{ transitionDelay: `${index * 100}ms` }}>
                                            <StyledTableRow>
                                                <TableCell>{caso.nombreCaso}</TableCell>
                                                <TableCell>
                                                    {caso.idCliente
                                                        ? `${caso.idCliente.nombres} ${caso.idCliente.apellidos}`
                                                        : 'No asignado'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <EstadoBoton activo={caso.activo}>
                                                        {caso.activo ? 'Activo' : 'Inactivo'}
                                                    </EstadoBoton>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Ver detalles del caso">
                                                        <IconButton onClick={() => handleOpenCasoDetails(caso)}>
                                                            <MenuOpenIcon color="primary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Ver historial del caso">
                                                        <IconButton onClick={() => handleOpenHistorial(caso)}>
                                                            <ArticleIcon color="secondary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </StyledTableRow>
                                        </Zoom>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ fontStyle: 'italic' }}>
                                            No hay casos asignados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />

            {selectedCaso && (
                <DetectiveCasoDetailsMenu
                    caso={selectedCaso}
                    onClose={() => setSelectedCaso(null)}
                />
            )}

            {selectedHistorialCaso && (
                <HistorialCasoDetailsMenuDetective
                    caso={selectedHistorialCaso}
                    onClose={() => setSelectedHistorialCaso(null)}
                />
            )}

            <StyledFooter>
                <Typography paragraph>{footerText}</Typography>
                <Button
                    startIcon={<TermsIcon />}
                    sx={{ mt: 1 }}
                    onClick={() => navigate('/terms-and-conditions')}
                >
                    Ver Términos y Condiciones
                </Button>
            </StyledFooter>
        </Box>
    );
};

export default DetectiveMenu;
