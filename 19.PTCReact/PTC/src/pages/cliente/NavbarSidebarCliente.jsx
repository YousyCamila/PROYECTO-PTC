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
import HistoryIcon from '@mui/icons-material/History';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavbarSidebarCliente = ({ nombreCliente = 'Cliente' }) => {
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
            }}
        >
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
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
                Cliente - Portal de Casos
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src="/default-profile.png" sx={{ width: 40, height: 40, mr:1 }} />

                <Typography variant="body1" sx={{ color: 'white', mr: 1 }}>
                    Hola, {nombreCliente}
                </Typography>
                
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ color: 'white', ml: 1 }}
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
                    },
                }}
            >
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h5">Menú del Cliente</Typography>
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/ver-historial-casos')}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ver Historial de Casos" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/terminos-condiciones')}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <GavelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Términos y Condiciones" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/ver-contratos')}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contratos" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon sx={{ color: 'white' }}>
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

export default NavbarSidebarCliente;
