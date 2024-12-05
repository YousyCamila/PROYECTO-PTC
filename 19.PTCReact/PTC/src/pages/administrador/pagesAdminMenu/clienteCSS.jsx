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
import { motion } from 'framer-motion';

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

  const cardMotion = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

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
        {[
          {
            title: 'Clientes',
            icon: <ClientIcon sx={{ color: '#0077CC', fontSize: 40 }} />,
            value: `${clientesData.length} este mes`,
            chart: (
              <BarChart data={monthlyClientsData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="clientes" fill="#0077CC" />
              </BarChart>
            )
          },
          {
            title: 'Casos',
            icon: <CaseIcon sx={{ color: '#28a745', fontSize: 40 }} />,
            value: `${casosData.length} este mes`,
            chart: (
              <LineChart data={monthlyCasesData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="casos" stroke="#28a745" />
              </LineChart>
            )
          },
          {
            title: 'Crecimiento',
            icon: <GrowthIcon sx={{ color: '#6f42c1', fontSize: 40 }} />,
            value: '12.5%',
            chart: (
              <LineChart data={monthlyClientsData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="clientes" stroke="#6f42c1" />
              </LineChart>
            )
          }
        ].map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div {...cardMotion}>
              <Paper 
                elevation={3} 
                sx={{ p: 3, height: '100%', borderRadius: 3 }}
              >
                <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                  {card.icon}
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                </Stack>
                <Typography variant="h4" sx={{ mb: 2, color: card.icon.props.sx.color }}>
                  {card.value}
                </Typography>
                <Box sx={{ height: 150 }}>
                  <ResponsiveContainer>
                    {card.chart}
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClienteCSS;
