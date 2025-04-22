import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Tooltip
} from '@mui/material';
import { 
  Lightbulb as IdeaIcon, 
  CheckCircle as CheckIcon, 
  TrendingUp as GrowthIcon,
  Shield as ProtectIcon,
  Group as TeamIcon,  // Cambio aquí
  Description as DocumentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Sugerencias = () => {
  const suggestions = [
    {
      icon: <CheckIcon />,
      title: "Gestión Ética",
      description: "Mantén los más altos estándares éticos en todas las investigaciones.",
      color: "text-green-600"
    },
    {
      icon: <TeamIcon />,  // Usando Group como ícono de usuarios o equipo
      title: "Desarrollo del Equipo",
      description: "Invierte en capacitación y desarrollo continuo de tus detectives.",
      color: "text-blue-600"
    },
    {
      icon: <ProtectIcon />,
      title: "Confidencialidad",
      description: "Protege siempre la información sensible de clientes y casos.",
      color: "text-red-600"
    },
    {
      icon: <DocumentIcon />,
      title: "Documentación Precisa",
      description: "Mantén registros detallados y precisos de cada caso.",
      color: "text-purple-600"
    },
    {
      icon: <GrowthIcon />,
      title: "Mejora Continua",
      description: "Analiza y optimiza constantemente los procesos de la agencia.",
      color: "text-orange-600"
    },
    {
      icon: <IdeaIcon />,
      title: "Innovación",
      description: "Mantente actualizado con las últimas tecnologías de investigación.",
      color: "text-teal-600"
    }
  ];

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 3, 
        mt: 4, 
        backgroundColor: 'rgba(255,255,255,0.9)', 
        borderRadius: 3 
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          textAlign: 'center', 
          color: '#2c3e50', 
          fontWeight: 'bold' 
        }}
      >
        Guía para Administradores de Agencia Detectivesca
      </Typography>
      <Grid container spacing={3}>
        {suggestions.map((suggestion, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 15px rgba(0,0,0,0.1)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Tooltip 
                title={suggestion.description} 
                placement="top"
                arrow
              >
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(245,245,245,0.7)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(230,230,230,0.7)'
                    }
                  }}
                >
                  {React.cloneElement(suggestion.icon, {
                    className: `w-12 h-12 mb-2 ${suggestion.color}`,
                    style: { fontSize: 48 }
                  })}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#2c3e50'
                    }}
                  >
                    {suggestion.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      color: 'text.secondary' 
                    }}
                  >
                    {suggestion.description}
                  </Typography>
                </Box>
              </Tooltip>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sugerencias;
