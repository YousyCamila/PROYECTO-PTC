import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido a la Página Principal
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Aquí puedes ver un resumen de la aplicación.
      </Typography>
      <Button 
        variant="contained" 
        href="/login" 
        sx={{ mt: 2 }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default Home;
