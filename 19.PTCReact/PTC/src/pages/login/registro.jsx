import { Box, Button, Container, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide } from '@mui/material'; // Para la animación de entrada
import { MdArrowBack } from 'react-icons/md'; // Cambié ArrowBack por MdArrowBack
import { motion } from 'framer-motion';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para confirmar contraseña
  const [role, setRole] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // Código de verificación
  const [showVerification, setShowVerification] = useState(false); // Mostrar cuadro de verificación
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para manejar Snackbar de éxito
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje de éxito en Snackbar
  const navigate = useNavigate();

  const ADMIN_CODE = "123456"; // Código de verificación para administrador
  const DECT_CODE = "09876"; // Código de verificación para detective

  const register = async (e) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setSnackbarMessage("Contraseñas no coinciden. Por favor, asegúrate de que ambas contraseñas sean iguales.");
      setOpenSnackbar(true);
      return; // Detener el proceso de registro si no coinciden
    }

    // Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith(".com")) {
      setSnackbarMessage("Por favor, ingresa un correo válido que termine en '.com'.");
      setOpenSnackbar(true);
      return;
    }

    // Validar código de verificación si es administrador
    if (role === "administrador" && verificationCode !== ADMIN_CODE) {
      setSnackbarMessage("Código de verificación incorrecto.");
      setOpenSnackbar(true);
      return; // Detener el proceso si el código es incorrecto
    }
    
    // Validar código de verificación si es detective
    if (role === "detective" && verificationCode !== DECT_CODE) {
      setSnackbarMessage("Código de verificación incorrecto.");
      setOpenSnackbar(true);
      return; // Detener el proceso si el código es incorrecto
    } 

    try {
      const response = await fetch("http://localhost:3000/api/usuario/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: fullName, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage("Usuario registrado exitosamente");
        setOpenSnackbar(true);

        // Redirigir según el rol seleccionado
        if (role === "detective") {
          navigate(`/detective-form?email=${encodeURIComponent(email)}`);
        } else if (role === "cliente") {
          navigate(`/cliente-form?email=${encodeURIComponent(email)}`);
        } else if (role === "administrador") {
          navigate(`/administrador-form?email=${encodeURIComponent(email)}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        setSnackbarMessage(data.error || "Ocurrió un error inesperado.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      setSnackbarMessage("Ocurrió un error inesperado, por favor intenta más tarde.");
      setOpenSnackbar(true);
    }
  };


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to top, #0077b6, #00aaff)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0077b6',
          color: 'white',
          padding: '10px 20px',
          position: 'absolute',
          top: 0,
          zIndex: 100,
        }}
      >
        <IconButton
          onClick={() => navigate('/login')}
          sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
        >
          <MdArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '20px' }}>
            Volver
          </Typography>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          PTC
        </Typography>
      </Box>
  
      {/* Formulario de Registro */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}  // Comienza con 50px abajo y opacidad 0
        animate={{ y: 0, opacity: 1 }}   // Alcanza la posición original con opacidad 1
        transition={{ duration: 0.8 }}    // Duración de la animación
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center', // Centrado horizontal
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            marginTop: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center", color: "#0077b6" }}>
            Registrarse
          </Typography>
  
          <form onSubmit={register}>
            <TextField
              fullWidth
              label="Nombre Completo"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Correo"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setShowVerification(e.target.value === "administrador" || e.target.value === "detective");
                }}
                required
              >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="detective">Detective</MenuItem>
              </Select>
            </FormControl>
  
            {showVerification && (
              <TextField
                fullWidth
                label="Código de Verificación"
                margin="normal"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            )}
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
            >
              Registrarse
            </Button>
          </form>
        </Container>
      </motion.div>
  
      {/* Footer */}
      <Box sx={{ position: "absolute", bottom: 0, width: "100%", padding: "2px", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", textAlign: "center" }}>
        <Typography variant="body2">&copy; 2024 PTC. Todos los derechos reservados.</Typography>
      </Box>
  
      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default Register;
