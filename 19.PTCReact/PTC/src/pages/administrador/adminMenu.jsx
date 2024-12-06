import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Stack,
  Tab,
  Tabs
} from '@mui/material';
import {
  Work as WorkIcon,
  Group as GroupIcon,
  LocalPolice as DetectiveIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  NotificationsActive as AlertIcon,
  CheckCircle as SuccessIcon,
  Schedule as PendingIcon,
  Dashboard as DashboardIcon,
  Person as ClienteIcon,
  Lightbulb as SugerenciasIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NavbarSidebar from './NavbarSidebar';
import ClienteCSS from './pagesAdminMenu/clienteCSS';
import Sugerencias from './pagesAdminMenu/sugerencias';

const recentActivities = [
  {
    id: 1,
    type: 'success',
    title: 'Caso Resuelto',
    description: 'El detective Martinez cerró exitosamente el caso #4589',
    timestamp: '2 horas atrás',
    icon: <SuccessIcon sx={{ color: '#2ecc71' }} />,
    status: 'Completado'
  },
  {
    id: 2,
    type: 'alert',
    title: 'Nueva Evidencia',
    description: 'Se ha agregado nueva evidencia al caso #4582',
    timestamp: '4 horas atrás',
    icon: <AlertIcon sx={{ color: '#e74c3c' }} />,
    status: 'Urgente'
  },
  {
    id: 3,
    type: 'pending',
    title: 'Caso en Progreso',
    description: 'Actualización del caso #4575 por el detective Johnson',
    timestamp: '1 día atrás',
    icon: <PendingIcon sx={{ color: '#f39c12' }} />,
    status: 'En Progreso'
  }
];

const performanceData = [
  { mes: 'Ene', casos: 4, resueltos: 3 },
  { mes: 'Feb', casos: 6, resueltos: 4 },
  { mes: 'Mar', casos: 8, resueltos: 7 },
  { mes: 'Abr', casos: 5, resueltos: 4 },
  { mes: 'May', casos: 9, resueltos: 8 },
  { mes: 'Jun', casos: 7, resueltos: 6 }
];

const AdminMenu = () => {
  const [mode, setMode] = useState('dark');
  const [casos, setCasos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#3498db' : '#2980b9',
      },
      secondary: {
        main: mode === 'dark' ? '#2ecc71' : '#27ae60',
      },
      background: {
        default: mode === 'dark' ? '#0a1929' : '#f0f2f5',
        paper: mode === 'dark' ? '#1a2027' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#2c3e50',
        secondary: mode === 'dark' ? '#b2bac2' : '#7f8c8d',
      }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'dark'
                ? '0 8px 24px rgba(0,0,0,0.4)'
                : '0 8px 24px rgba(0,0,0,0.1)',
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16
          }
        }
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casosResponse, clientesResponse, detectivesResponse] = await Promise.all([
          fetch('http://localhost:3000/api/caso').then(res => res.json()),
          fetch('http://localhost:3000/api/clientes').then(res => res.json()),
          fetch('http://localhost:3000/api/detectives').then(res => res.json())
        ]);

        setCasos(casosResponse);
        setClientes(clientesResponse);
        setDetectives(detectivesResponse);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const MetricCard = ({ icon, title, value, trend, color }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>
            {icon}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {trend > 0 ? <TrendUpIcon color="success" /> : <TrendDownIcon color="error" />}
            <Typography
              variant="body2"
              color={trend > 0 ? 'success.main' : 'error.main'}
              sx={{ ml: 1 }}
            >
              {Math.abs(trend)}% desde el mes pasado
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const ActivityList = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Actividad Reciente
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{activity.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1">{activity.title}</Typography>
                      <Chip
                        label={activity.status}
                        size="small"
                        color={
                          activity.type === 'success' ? 'success' :
                            activity.type === 'alert' ? 'error' : 'warning'
                        }
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {activity.timestamp}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const PerformanceChart = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Rendimiento Mensual
        </Typography>
        <Box sx={{ height: 300, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="casos"
                stroke="#3498db"
                name="Casos Nuevos"
              />
              <Line
                type="monotone"
                dataKey="resueltos"
                stroke="#2ecc71"
                name="Casos Resueltos"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );

  const DashboardContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <MetricCard
            icon={<DetectiveIcon />}
            title="Detectives Activos"
            value={detectives.length || 0}
            trend={8.5}
            color="primary"
          />
          <MetricCard
            icon={<WorkIcon />}
            title="Casos Abiertos"
            value={casos.length || 0}
            trend={15.5}
            color="warning"
          />
          <MetricCard
            icon={<GroupIcon />}
            title="Clientes Registrados"
            value={clientes.length || 0}
            trend={-5.2}
            color="info"
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PerformanceChart />
          </Grid>
          <Grid item xs={12}>
            <ActivityList />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return <DashboardContent />;
      case 1:
        return <ClienteCSS />;
      case 2:
        return <Sugerencias />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavbarSidebar />

        <IconButton
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          sx={{
            position: 'fixed',
            top: 16,  // Puedes ajustar este valor si deseas cambiar la altura
            right: 16,  // Alineado a la derecha
            zIndex: 1200,
            bgcolor: 'background.paper',
            borderRadius: '50%',  // Hace que el botón sea circular
            boxShadow: 2,  // Añade sombra para mayor visibilidad
            '&:hover': {
              boxShadow: 6,  // Sombra más intensa al pasar el ratón
            }
          }}
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>


        <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={currentTab}
              onChange={(_, newValue) => setCurrentTab(newValue)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<DashboardIcon />} label="Dashboard" />
              <Tab icon={<ClienteIcon />} label="Clientes" />
              <Tab icon={<SugerenciasIcon />} label="Sugerencias" />
            </Tabs>
          </Paper>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AdminMenu;