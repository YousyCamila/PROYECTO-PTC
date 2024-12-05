import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Stack 
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Group as ClientIcon, 
  Work as CaseIcon, 
  TrendingUp as GrowthIcon 
} from '@mui/icons-material';

const ClienteCSS = () => {
  const [clientesData, setClientesData] = useState([]);
  const [casosData, setCasosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await fetch('http://localhost:3000/api/clientes');
        const casosResponse = await fetch('http://localhost:3000/api/caso');
        
        const clientes = await clientesResponse.json();
        const casos = await casosResponse.json();
        
        setClientesData(clientes);
        setCasosData(casos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const monthlyClientsData = [
    { name: 'Ene', clientes: 45 },
    { name: 'Feb', clientes: 60 },
    { name: 'Mar', clientes: 55 },
    { name: 'Abr', clientes: 70 }
  ];

  const monthlyCasesData = [
    { name: 'Ene', casos: 20 },
    { name: 'Feb', casos: 35 },
    { name: 'Mar', casos: 25 },
    { name: 'Abr', casos: 40 }
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          textAlign: 'center', 
          color: '#2c3e50', 
          fontWeight: 'bold' 
        }}
      >
        Reporte de Gestión
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
              <ClientIcon sx={{ color: '#0077CC', fontSize: 40 }} />
              <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                Clientes
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ color: '#0077CC', mb: 2 }}>
              {clientesData.length} este mes
            </Typography>
            <Box sx={{ height: 150 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyClientsData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="clientes" fill="#0077CC" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
              <CaseIcon sx={{ color: '#28a745', fontSize: 40 }} />
              <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                Casos
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ color: '#28a745', mb: 2 }}>
              {casosData.length} este mes
            </Typography>
            <Box sx={{ height: 150 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyCasesData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Line type="monotone" dataKey="casos" stroke="#28a745" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
              <GrowthIcon sx={{ color: '#6f42c1', fontSize: 40 }} />
              <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                Crecimiento
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ color: '#6f42c1', mb: 2 }}>
              12.5%
            </Typography>
            <Box sx={{ height: 150 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyClientsData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Line type="monotone" dataKey="clientes" stroke="#6f42c1" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClienteCSS;