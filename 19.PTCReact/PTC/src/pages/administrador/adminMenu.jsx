import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Paper 
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Work as WorkIcon, 
  Group as GroupIcon 
} from '@mui/icons-material';
import NavbarSidebar from './NavbarSidebar';
import { motion } from 'framer-motion';
import ClienteCSS from './pagesAdminMenu/clienteCSS';

const MetricCard = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ width: '250px' }}
  >
    <Box 
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        gap: 2
      }}
    >
      {React.cloneElement(icon, { 
        sx: { 
          fontSize: 40, 
          color: '#4a90e2' 
        } 
      })}
      <Box>
        <Typography 
          variant="caption" 
          color="textSecondary" 
          sx={{ 
            display: 'block', 
            textTransform: 'uppercase',
            fontWeight: 600
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#2c3e50' 
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

const AdminMenu = () => {
  const [casos, setCasos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/api/caso').then(res => res.json()),
      fetch('http://localhost:3000/api/clientes').then(res => res.json()),
      fetch('http://localhost:3000/api/detectives').then(res => res.json())
    ]).then(([casosData, clientesData, detectivesData]) => {
      setCasos(casosData);
      setClientes(clientesData);
      setDetectives(detectivesData);
    }).catch(console.error);
  }, []);

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f4f6f9', 
        minHeight: '100vh', 
        position: 'relative' 
      }}
    >
      <NavbarSidebar />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
        <Paper 
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'white',
            width: 300
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2, 
              textAlign: 'center',
              color: '#2c3e50',
              fontWeight: 'bold' 
            }}
          >
            Reporte
          </Typography>

          <Stack spacing={2} alignItems="center">
            <MetricCard icon={<PersonIcon />} title="Detectives" value={detectives.length} />
            <MetricCard icon={<WorkIcon />} title="Casos Abiertos" value={casos.length} />
            <MetricCard icon={<GroupIcon />} title="Clientes" value={clientes.length} />
          </Stack>
        </Paper>

        {/* Contenido del ClienteCSS */}
        <Box sx={{ flex: 1, ml: 3 }}>
          <ClienteCSS />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminMenu;
