import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Avatar,
    Typography,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'; // Cambié a WorkHistoryIcon para el historial de casos
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const NavbarSidebarDetective = ({ nombreDetective = 'Detective' }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuClose = () => {
        setOpenMenu(false);
    };

    const handleLogout = () => {
        // Aquí puedes hacer la lógica de logout, como limpiar el estado del usuario, etc.
        navigate('/');
    };

    const handleNavigation = (route) => {
        navigate(route);
        setSidebarOpen(false);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '10vh',
                background: 'linear-gradient(135deg, #4892d4 0%, #0077b6 100%)',
                display: 'flex',
                alignItems: 'center',
                paddingX: 2,
                justifyContent: 'space-between',
                position: 'fixed',
                top: 0,
                zIndex: 1000,
                boxShadow: 3,
            }}
        >
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white', '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease' } }}>
                <MenuIcon sx={{ fontSize: 35 }} />
            </IconButton>

            <Typography
                variant="h5"
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    flexGrow: 1,
                    ml: 2,
                }}
            >
                Detective - Portal de Casos
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="/default-profile.png" sx={{ width: 40, height: 40, mr: 1, '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease' } }} />
                <Typography variant="body1" sx={{ color: 'white', mr: 1 }}>
                    Hola, {nombreDetective}
                </Typography>
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ color: 'white', ml: 1, '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease' } }}
                >
                    <ArrowDropDownIcon />
                </IconButton>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                sx={{ mt: '45px' }}
            >
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Cerrar Sesión
                </MenuItem>
            </Menu>

            <Drawer
                anchor="left"
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        backgroundColor: '#003b5c',
                        color: 'white',
                        boxShadow: 3,
                    },
                }}
            >
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h5">Menú del Detective</Typography>
                </Box>
                <List>
                    {/* Aquí agregamos un ejemplo de estado de caso */}
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/ver-casos')}>
                            <ListItemIcon sx={{ color: 'white', '&:hover': { color: '#ffd700' } }}>
                                <WorkHistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ver Casos Asignados" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/terminos-condiciones')}>
                            <ListItemIcon sx={{ color: 'white', '&:hover': { color: '#ffd700' } }}>
                                <GavelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Términos y Condiciones" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/ver-contratos')}>
                            <ListItemIcon sx={{ color: 'white', '&:hover': { color: '#ffd700' } }}>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contratos" />
                        </ListItemButton>
                    </ListItem>

                    {/* Ejemplo de caso con estado */}
                    <ListItem disablePadding sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#004d40', transition: 'background-color 0.3s ease' } }}>
                        <ListItemButton onClick={() => handleNavigation('/caso-detalles')}>
                            <ListItemIcon sx={{ color: 'white', '&:hover': { color: '#ffd700' } }}>
                                <WorkHistoryIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Caso Activo"
                                sx={{
                                    color: 'white',
                                    '& .MuiTypography-root': {
                                        color: 'white',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#9e2a2f', transition: 'background-color 0.3s ease' } }}>
                        <ListItemButton onClick={() => handleNavigation('/caso-detalles')}>
                            <ListItemIcon sx={{ color: 'white', '&:hover': { color: '#ffd700' } }}>
                                <WorkHistoryIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Caso Inactivo"
                                sx={{
                                    color: 'white',
                                    '& .MuiTypography-root': {
                                        color: 'white',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon sx={{ color: 'white', '&:hover': { color: '#ffd700' } }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesión" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider sx={{ backgroundColor: '#777' }} />
            </Drawer>
        </Box>
    );
};

export default NavbarSidebarDetective;
