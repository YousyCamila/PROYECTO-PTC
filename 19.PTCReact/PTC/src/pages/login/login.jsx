import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

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
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";

import { 
  ArrowBack, 
  Login as LoginIcon, 
  PersonAdd,
  Visibility, 
  VisibilityOff 
} from "@mui/icons-material";

import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Llama al método login con el token completo
        login(data.accessToken);

        // Redirige según el rol
        const decodedToken = jwt_decode(data.accessToken);
        switch(decodedToken.role) {
          case "administrador":
            navigate("/admin-menu");
            break;
          case "cliente":
            navigate("/cliente-menu");
            break;
          case "detective":
            navigate("/detective-menu");
            break;
          default:
            navigate("/");
        }

        // Opcional: mostrar snackbar de éxito
        setShowSnackbar(true);
      } else {
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
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* NavBar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to left, rgba(0, 0, 139, 1), rgba(0, 0, 0, 0.911), rgba(0, 0, 139, 1))",
          color: "white",
          padding: "10px 20px",
          position: "absolute",
          top: "10px",
        }}
      >
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          PTC - Iniciar Sesión
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%" }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            marginTop: 10,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", color: "#003366", marginBottom: 4 }}
          >
            Iniciar sesión
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Correo"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText="Por favor, ingresa tu correo electrónico"
              sx={{
                marginBottom: "16px",
                input: { color: "#003366" },
              }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Ingresa tu contraseña"
              sx={{
                marginBottom: "16px",
                input: { color: "#003366" },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ padding: "10px" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <FormControl fullWidth margin="normal" sx={{ marginBottom: "16px" }}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="detective">Detective</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#003366",
                color: "white",
                "&:hover": { backgroundColor: "#002244" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LoginIcon /> Iniciar sesión
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                color: "#003366",
                borderColor: "#003366",
                "&:hover": { backgroundColor: "#e0e0e0" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              onClick={() => navigate("/register")}
            >
              <PersonAdd /> ¿No tienes cuenta? Regístrate
            </Button>
          </form>
        </Container>
      </motion.div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Inicio de sesión exitoso
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;