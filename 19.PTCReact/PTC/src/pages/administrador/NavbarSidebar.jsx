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
    Tooltip,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ArticleIcon from '@mui/icons-material/Article';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';



const NavbarSidebar = () => {
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
        localStorage.removeItem("token");
        setSidebarOpen(false);
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión exitosamente',
        }).then(() => {
            navigate('/'); // Navegar a la página de inicio
        });
    };

    const handleBack = () => {
        navigate('/admin-menu');
    };

    const handleNavigation = (route) => {
        navigate(route);
        setSidebarOpen(false);
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '12vh',
                background: '#4892d4',
                display: 'flex',
                justifyContent: 'space-between', // Cambiado de 'center' a 'space-between'
                alignItems: 'center',
                position: 'relative',
                paddingX: 2, // Añadido para darle un espacio en los laterales
                boxSizing: 'border-box',
            }}
        >

            {/* Botón de menú (sidebar) */}
            <IconButton
                onClick={() => setSidebarOpen(true)}
                sx={{
                    backgroundColor: '#0077b6',
                    color: 'white',
                    fontSize: '2rem',
                    padding: '16px',
                    '&:hover': {
                        backgroundColor: '#005f91',
                        transform: 'scale(1.1)',
                    },
                    transition: 'transform 0.3s ease-in-out',
                }}
            >

                <MenuIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>

          {/* Título Principal con Animación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            style={{
              textAlign: 'center',
              padding: '1px 10', // Reduce el padding superior para mover el título hacia arriba
            }}
          >
         

            {/* Título con gradiente */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(0,0,0,1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Informe General PTC
            </Typography>
          </motion.div>

            {/* Botones de acciones (parte superior derecha) */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap', // Agregado para permitir que los elementos se ajusten cuando se reduce el tamaño
                    justifyContent: 'flex-end', // Alinea los botones a la derecha
                }}
            >

                <Button
                    onClick={() => navigate('/responder-solicitudes')}
                    sx={{
                        backgroundColor: '#0077b6',
                        color: 'white',
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        paddingRight: '10px',
                        width: '250px',
                        '&:hover': {
                            backgroundColor: '#005f91',
                        },
                    }}
                >

                    <InboxIcon sx={{ fontSize: 40 }} />
                    <span style={{ whiteSpace: 'nowrap' }}>Responder Solicitudes</span>
                    <span
                        style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '12px',
                            height: '12px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            animation: 'fade 2s ease-in-out infinite',
                        }}
                    />
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'black', fontSize: '1.0rem', mr: 1 }}>
                        Hola, administrador
                    </Typography>

                    <IconButton onClick={handleMenuOpen}>
                        <ArrowDropDownIcon sx={{ color: 'black', fontSize: '2rem' }} />
                    </IconButton>
                </Box>

                {/* Avatar que abre el menú */}
                <IconButton onClick={handleMenuOpen}>
                    <Avatar
                        sx={{
                            backgroundColor: '#fff',
                            color: '#0077b6',
                            border: '1px solid #0077b6',
                            width: 50,
                            height: 50,
                            '&:hover': {
                                backgroundColor: '#f0f8ff',
                            },
                        }}
                        src="https://icones.pro/wp-content/uploads/2021/02/symbole-masculin-icone-l-utilisateur-gris.png"
                        alt="Imagen"
                    />
                </IconButton>
            </Box>

            <style>
                {`
                    @keyframes fade {
                        0% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                `}
            </style>

            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                sx={{
                    mt: 3,
                    '& .MuiMenuItem-root': {
                        fontSize: '1.0rem',
                        padding: '9px 11px',
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.6rem',
                    },
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} /> Cerrar Sesión
                </MenuItem>
            </Menu>

            {/* Sidebar */}
            <Drawer
                anchor="left"
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#000',
                        color: 'white',
                    },
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#0077b6',
                        padding: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        PTC
                    </Typography>
                </Box>
                <List sx={{ mt: 2 }}>
                    {[
                        { text: 'Gestionar Clientes', route: '/gestionar-clientes', icon: <GroupIcon /> },
                        { text: 'Gestionar Detectives', route: '/gestionar-detectives', icon: <AssignmentIcon /> },
                        { text: 'Gestionar Casos', route: '/gestionar-casos', icon: <FolderSpecialIcon /> },
                        { text: 'Gestionar Contratos', route: '/gestionar-contratos', icon: <ArticleIcon /> },
                        // Botón para regresar al menú de administración
                        { text: 'Regresar al Menú de Admin', route: '/admin-menu', icon: <ArrowBackIcon /> },
                        // Botón para cerrar sesión
                        { text: 'Cerrar Sesión', action: handleLogout, icon: <LogoutIcon /> },
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => item.route ? handleNavigation(item.route) : item.action?.()}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#0077b6',
                                        color: 'white',
                                    },
                                    padding: '10px 20px',
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ backgroundColor: '#444' }} />

            </Drawer>

        </Box>
    );
};

export default NavbarSidebar;
