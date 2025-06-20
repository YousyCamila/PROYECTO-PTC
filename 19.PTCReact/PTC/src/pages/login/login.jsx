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
  VisibilityOff,
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
      const response = await fetch("https://6h1lz96w-3000.use2.devtunnels.ms//api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.accessToken);
        const decodedToken = jwt_decode(data.accessToken);
        switch (decodedToken.role) {
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
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Estética navbar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0077b6",
          color: "white",
          padding: "12px 24px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
          position: "absolute",
          top: 0,
        }}
      >
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
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
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            marginTop: 10,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#003366",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            Iniciar sesión
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              id= "corr-select"
              label="Correo"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText="Por favor, ingresa tu correo electrónico"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              id= "cont-select"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Ingresa tu contraseña"
              sx={{ marginBottom: 2 }}
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
            <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
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
                backgroundColor: "#0077b6",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#005f87" },
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
                color: "#0077b6",
                borderColor: "#0077b6",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e0f2f1" },
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
