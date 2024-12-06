import React, { useState, useEffect } from 'react';
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
    Button,
    Paper,
    useTheme,
    alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ArticleIcon from '@mui/icons-material/Article';
import InboxIcon from '@mui/icons-material/Inbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const NavbarSidebar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [title, setTitle] = useState("Informe General PTC");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setTitle(prev => prev === "Informe General PTC" ? "Vista General" : "Informe General PTC");
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setSidebarOpen(false);
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión exitosamente',
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
        }).then(() => navigate('/'));
    };

    const menuItems = [
        { text: 'Gestionar Clientes', route: '/gestionar-clientes', icon: <GroupIcon /> },
        { text: 'Gestionar Detectives', route: '/gestionar-detectives', icon: <AssignmentIcon /> },
        { text: 'Gestionar Casos', route: '/gestionar-casos', icon: <FolderSpecialIcon /> },
        { text: 'Gestionar Contratos', route: '/gestionar-contratos', icon: <ArticleIcon /> },
        { text: 'Regresar al Menú de Admin', route: '/admin-menu', icon: <ArrowBackIcon /> },
    ];

    return (
        <Paper 
            elevation={3}
            sx={{
                width: '100%',
                position: 'fixed',
                top: 0,
                zIndex: 1100,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    height: '70px',
                }}
            >
                <IconButton
                    onClick={() => setSidebarOpen(true)}
                    sx={{
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.common.white, 0.2),
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={title}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            }}
                        >
                            {title}
                        </Typography>
                    </motion.div>
                </AnimatePresence>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/responder-solicitudes')}
                        startIcon={<InboxIcon />}
                        sx={{
                            backgroundColor: alpha(theme.palette.common.white, 0.1),
                            color: 'white',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.common.white, 0.2),
                            },
                            position: 'relative',
                            padding: '10px 24px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: 3,
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        Responder Solicitudes
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                width: 10,
                                height: 10,
                                bgcolor: theme.palette.error.main,
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                    '0%': { transform: 'scale(1)', opacity: 1 },
                                    '50%': { transform: 'scale(1.5)', opacity: 0.5 },
                                    '100%': { transform: 'scale(1)', opacity: 1 },
                                },
                            }}
                        />
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: 'white' }}>
                            Hola, administrador
                        </Typography>
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ color: 'white' }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: alpha(theme.palette.common.white, 0.1),
                                    border: `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
                                }}
                            >
                                AD
                            </Avatar>
                        </IconButton>
                    </Box>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar Sesión" />
                    </MenuItem>
                </Menu>

                <Drawer
                    anchor="left"
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 280,
                            background: theme.palette.background.default,
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
                        }
                    }}
                >
                    <Box sx={{ p: 3, bgcolor: theme.palette.primary.main }}>
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                            PTC
                        </Typography>
                    </Box>
                    <List sx={{ p: 2 }}>
                        {menuItems.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(item.route);
                                        setSidebarOpen(false);
                                    }}
                                    sx={{
                                        borderRadius: 1,
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    borderRadius: 1,
                                    color: theme.palette.error.main,
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.error.main, 0.1),
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cerrar Sesión" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </Paper>
    );
};

export default NavbarSidebar;
