import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Importa jwt_decode para decodificar el token JWT
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Slide,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { MdArrowBack } from 'react-icons/md'; 
import { motion } from "framer-motion"; // Importa framer-motion

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState(""); // Añadir fullName
  const [confirmPassword, setConfirmPassword] = useState(""); // Añadir confirmPassword
  const [verificationCode, setVerificationCode] = useState(""); // Añadir verificationCode
  const [showVerification, setShowVerification] = useState(false); // Añadir showVerification
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Añadir snackbarMessage
  const [openSnackbar, setOpenSnackbar] = useState(false); // Añadir openSnackbar
  const navigate = useNavigate();

  // Verifica si el usuario ya tiene un token
  const checkAuth = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.role === "administrador") {
        navigate("/admin-menu");
      } else if (decodedToken.role === "cliente") {
        navigate("/cliente-menu");
      } else if (decodedToken.role === "detective") {
        navigate("/detective-menu");
      }
    }
  };

  // Llamada al backend para el login
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }), // Incluye el rol en la solicitud
      });

      const data = await response.json();

      if (response.ok) {
        // Decodifica el token para obtener email, id y role
        const decodedToken = jwt_decode(data.accessToken);

        // Guarda los datos en localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", decodedToken.id); // Guarda el id del usuario
        localStorage.setItem("email", decodedToken.email); // Guarda el email
        localStorage.setItem("role", decodedToken.role); // Guarda el rol

        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: "Bienvenido de nuevo!",
        });

        // Redirige según el rol decodificado del token
        if (decodedToken.role === "administrador") {
          navigate("/admin-menu");
        } else if (decodedToken.role === "cliente") {
          navigate("/cliente-menu");
        } else if (decodedToken.role === "detective") {
          navigate("/detective-menu");
        }
      } else {
        // Mostrar mensaje de error si hay problema con el rol o credenciales
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: data.error || "Credenciales inválidas",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado, por favor intenta más tarde.",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('https://scontent.fbog4-1.fna.fbcdn.net/v/t39.30808-6/312404170_109199351992944_5430879874558801924_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BxpplRDTj9EQ7kNvgHWi6tN&_nc_zt=23&_nc_ht=scontent.fbog4-1.fna&_nc_gid=A2AKN1EgkgNUcogxmZd092q&oh=00_AYD1yB-yGwsjJNx-xZQwyw0ljfDE6ELkeYLQYGZUUNP0tA&oe=6720401C')",
        backgroundSize: "cover",
        background: "linear-gradient(to top, #0077b6, #00aaff)",
        backgroundPosition: "center",
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
          onClick={() => navigate('/')}
          sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
        >
          <MdArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '10px' }}>
            Volver
          </Typography>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          PTC
        </Typography>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}  // Comienza con 50px abajo y opacidad 0
          animate={{ y: 0, opacity: 1 }}   // Alcanza la posición original con opacidad 1
          transition={{ duration: 0.8 }}    // Duración de la animación
          style={{
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#0077b6",
              marginBottom: "20px",
            }}
          >
            Iniciar sesión
          </Typography>

          <form onSubmit={login}>
            <TextField
              fullWidth
              label="Correo"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginBottom: "16px" }}
            />
            <FormControl fullWidth margin="normal" sx={{ marginBottom: "16px" }}>
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
                sx={{ marginBottom: "16px" }}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#0077b6",
                "&:hover": { backgroundColor: "#005f91" },
              }}
            >
              Iniciar sesión
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/register")}
              sx={{
                mb: 2,
                color: "#0077b6",
                borderColor: "#0077b6",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              ¿No tienes cuenta? Regístrate
            </Button>
          </form>
        </motion.div>
      </Container>
        {/* Footer */}
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", textAlign: "center" }}>
        <Typography variant="body2">&copy; 2024 PTC. Todos los derechos reservados.</Typography>
      </Box>

      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      />
    </Box>
    
  );
};

export default Login;
