import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Stack,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Zoom,
  useTheme
} from '@mui/material';
import { 
  Group as ClientIcon, 
  Work as CaseIcon, 
  TrendingUp as GrowthIcon, 
  Person as DetectiveIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown } from '@mui/icons-material';



const ClienteCSS = () => {
  const theme = useTheme();
  const [clientesData, setClientesData] = useState([]);
  const [casosData, setCasosData] = useState([]);
  const [detectivesData, setDetectivesData] = useState([]);
  const [detectivesBySpecialty, setDetectivesBySpecialty] = useState({});
  const [totalDetectives, setTotalDetectives] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const especialidades = {
    cadenaCustodia: 'Cadena de Custodia',
    investigacionExtorsion: 'Investigación de Extorsión',
    estudiosSeguridad: 'Estudios de Seguridad',
    investigacionInfidelidades: 'Investigación de Infidelidades',
    investigacionRobosEmpresariales: 'Robos Empresariales',
    antecedentes: 'Verificación de Antecedentes',
    recuperacionVehiculos: 'Recuperación de Vehículos'
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [detectivesRes, clientesRes, casosRes] = await Promise.all([
        fetch('http://localhost:3000/api/detectives'),
        fetch('http://localhost:3000/api/clientes'),
        fetch('http://localhost:3000/api/caso')
      ]);

      const [detectives, clientes, casos] = await Promise.all([
        detectivesRes.json(),
        clientesRes.json(),
        casosRes.json()
      ]);

      setDetectivesData(detectives);
      setClientesData(clientes);
      setCasosData(casos);
      setTotalDetectives(detectives.length);

      const conteoEspecialidades = Object.keys(especialidades).reduce((acc, esp) => {
        acc[esp] = detectives.filter(det => det.especialidad?.includes(esp)).length;
        return acc;
      }, {});

      setDetectivesBySpecialty(conteoEspecialidades);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const StatCard = ({ icon: Icon, title, value, chart, color, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card sx={{ height: '100%', position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>
              <Icon />
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" color="text.primary">
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
            </Box>
            {trend && (
              <Chip
                size="small"
                icon={trend > 0 ? <TrendingUp /> : <TrendingDown />}
                label={`${trend > 0 ? '+' : ''}${trend}%`}
                color={trend > 0 ? 'success' : 'error'}
                sx={{ ml: 'auto' }}
              />
            )}
          </Box>
          <Box sx={{ height: 100 }}>
            <ResponsiveContainer>
              {chart}
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const SpecialtyCard = ({ specialty, count, detectives, maxCount }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SecurityIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" component="div">
              {especialidades[specialty]}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {count} Detectives
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(count / maxCount) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {detectives
              .filter(det => det.especialidad?.includes(specialty))
              .map((det, idx) => (
                <Chip
                  key={idx}
                  avatar={<Avatar>{det.nombre1?.[0] || ''}</Avatar>}
                  label={`${det.nombre1} ${det.apellido1}`}
                  variant="outlined"
                  size="small"
                  sx={{ my: 0.5 }}
                />
              ))}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  const maxSpecialtyCount = Math.max(...Object.values(detectivesBySpecialty));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de Gestión
        </Typography>
        <Tooltip title="Actualizar datos" TransitionComponent={Zoom}>
          <IconButton onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={ClientIcon}
            title="Total Clientes"
            value={clientesData.length}
            color="primary"
            trend={15}
            chart={
              <BarChart data={[
                { name: 'Ene', value: 30 },
                { name: 'Feb', value: 45 },
                { name: 'Mar', value: 55 },
                { name: 'Abr', value: clientesData.length }
              ]}>
                <Bar dataKey="value" fill={theme.palette.primary.main} />
              </BarChart>
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            icon={CaseIcon}
            title="Casos Activos"
            value={casosData.length}
            color="success"
            trend={8}
            chart={
              <LineChart data={[
                { name: 'Ene', value: 20 },
                { name: 'Feb', value: 35 },
                { name: 'Mar', value: 25 },
                { name: 'Abr', value: casosData.length }
              ]}>
                <Line type="monotone" dataKey="value" stroke={theme.palette.success.main} />
              </LineChart>
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            icon={DetectiveIcon}
            title="Detectives Activos"
            value={totalDetectives}
            color="info"
            trend={-3}
            chart={
              <BarChart data={[
                { name: 'Ene', value: 12 },
                { name: 'Feb', value: 15 },
                { name: 'Mar', value: 14 },
                { name: 'Abr', value: totalDetectives }
              ]}>
                <Bar dataKey="value" fill={theme.palette.info.main} />
              </BarChart>
            }
          />
        </Grid>

        {Object.entries(detectivesBySpecialty).map(([specialty, count]) => (
          <Grid item xs={12} md={4} key={specialty}>
            <SpecialtyCard
              specialty={specialty}
              count={count}
              detectives={detectivesData}
              maxCount={maxSpecialtyCount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClienteCSS;